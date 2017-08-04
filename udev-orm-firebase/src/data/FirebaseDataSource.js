import { DataSource } from 'udev-orm';

export default class FirebaseDataSource extends DataSource {

  constructor(props = {}) {
    super(props);
  }

  async connect() {
    let firebase = this.props.firebase;
    firebase.database.enableLogging(true);
    return firebase.database();
  }

}
