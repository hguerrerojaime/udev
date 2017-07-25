export default class DataSource {

  constructor(props = {}) {
    this.props = props;
  }

  connect() {
    throw new TypeError("Not yet implemented");
  }

}
