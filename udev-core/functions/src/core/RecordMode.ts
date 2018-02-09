export class RecordMode {

  constructor(
    private _read:boolean,
    private _create: boolean,
    private _update: boolean
  ) {}

  get read() {
    return this._read;
  }

  get create() {
    return this._create;
  }

  get update() {
    return this._update;
  }

  public static valueOf(recordMode:string) {
    return RecordMode[recordMode];
  }

  public static ALL: RecordMode = new RecordMode(true,true,true);
  public static READ: RecordMode = new RecordMode(true,false,false);
  public static CREATE: RecordMode = new RecordMode(false,true,false);
  public static UPDATE: RecordMode = new RecordMode(false,false,true);
  public static WRITE: RecordMode = new RecordMode(false,true,true);

}
