import { Filter } from './Filter'

export class FirebaseTokenFilter implements Filter {

  constructor(private admin) {}

  public doFilter(request,response,next) {

    this.validateToken(request).then((decodedToken) => {
      request.user = decodedToken;
      next();
    }).catch((error) => {
      response.status(403).send('Unauthorized');
    });

  }

  private async validateToken(request) {

    const token = this.getToken(request);

    if (!token) {
      throw new Error("No Token Found");
    }

    return await this.admin.auth().verifyIdToken(token);

  }

  private getToken(request):boolean {
    if(!request.headers || !request.headers.authorization.startsWith('Bearer ')) {
      return undefined;
    }

    return request.headers.authorization.split('Bearer ')[1];
  }




}
