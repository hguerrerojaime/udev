import { RestController } from 'udev-mvc-ts';

import { inject } from "inversify";

export default class UserController extends RestController {

  constructor(
    @inject("userService") private userService
  ) {
    super();
  }

  async me($request) {
    return $request.user;
  }

  async register($request) {
    const command = $request.body;

    return this.userService.register({
      currentAccount: $request.user.uid,
      email: $request.user.email
    });
  }

  async myRealms($request) {
    const currentAccount = $request.user.uid;
    const realmCollection = await this.userService.findUserRealmsByAccountId(currentAccount);
    const result = {};

    realmCollection.forEach(function(doc) {
      result[doc.id] = doc.data();
    });

    return result;
  }


}
