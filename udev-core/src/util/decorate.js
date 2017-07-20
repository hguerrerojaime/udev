export default function decorate(target,annotation) {

  if (!target.meta) {
    target.meta = {};
  }

  if (!target.meta.annotations) {
    target.meta.annotations = {};
  }

  target.meta.annotations[annotation.name] = annotation;

}
