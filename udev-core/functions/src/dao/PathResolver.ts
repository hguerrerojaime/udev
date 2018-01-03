import { injectable, inject } from "inversify";

const DOC_OPEN = "["
const DOC_CLOSE = "]"
const SEPARATOR = "."

@injectable()
export default class PathResolver {

  public constructor(
    @inject("db") private db
  ) { }

  public lookup(pathString:string) {
    const path = parsePath(pathString);
    return this.lookupPath(path);
  }

  private lookupPath(path) {
    let ref = this.db;
    for (const pathElement of path) {
      ref = ref[pathElement.type](pathElement.name);
    }
    return ref;
  }

}


/**
*  TODO: clean this algorithm
*/
function parsePath(_path = "",docOpener = DOC_OPEN,docCloser = DOC_CLOSE,separator = SEPARATOR) {
  const path = _path.replace(/\s/g,'');
	const openerStack = [];
	const separatorStack = [-1];
	const reservedCharacters = [docOpener,docCloser,separator];

	const result = [];

	if (!path || reservedCharacters.indexOf(path[0]) >= 0) {
		throw new TypeError("invalid path");
	}

	for (let i = 0; i < path.length; i++) {
		const char = path[i];

		if (char === separator && path[i-1] !== docCloser) {
			throw new TypeError("invalid path");
		} else if (char === docOpener && reservedCharacters.indexOf(path[i-1]) >= 0) {
			throw new TypeError("invalid path");
		}


		if (char === docOpener) {
			openerStack.push(i);
			const colStartIdx = separatorStack.pop() + 1;

			if (reservedCharacters.indexOf(path[colStartIdx]) >= 0) {
			   throw new TypeError("invalid path");
			}
			result.push({ name: path.substring(colStartIdx,i), type: "collection" });
		} else if (char === separator) {
			separatorStack.push(i);
 		} else if (char === docCloser) {
			if (openerStack.length === 0) {
			  throw new TypeError("invalid path");
			}

			const docStartIdx = openerStack.pop() + 1;

			if (path[docStartIdx] !== '"' && path[i-1] !== '"') {
			  throw new TypeError("invalid path");
			}

			const docName = path.substring(docStartIdx + 1,i - 1);

			if (!docName) {
			  throw new TypeError("invalid path");
			}

			result.push({ name: docName, type: "doc"});
		}
	}

	const lastChar = path[path.length - 1];

	if (lastChar === separator) {
		throw new TypeError("invalid path");
	}

	if (separatorStack.length > 0) {
		const colStartIdx = separatorStack.pop() + 1;
		if (reservedCharacters.indexOf(path[colStartIdx]) >= 0) {
		   throw new TypeError("invalid path");
		}
		result.push({ name: path.substring(colStartIdx,path.length), type: "collection" });
	}

	return result;

}
