import { DataSource } from 'udev-orm';

export default class FirebaseDataSource extends DataSource {

  constructor(props = {}) {
    super(props);
  }

  async connect() {
    return this.props.firebase.database();
  }

}
