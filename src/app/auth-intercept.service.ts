import {HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {tap} from 'rxjs/operators';

export class AuthInterceptService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('Request is on its way');
    const modifiedRequest = req.clone({
        headers: req.headers.append( 'Authentication', 'Bearer AbCdEf123456 ')
      }
    );
    return next.handle(modifiedRequest);
  }

}
