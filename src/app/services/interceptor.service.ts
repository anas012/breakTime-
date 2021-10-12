import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';

import { finalize } from 'rxjs/operators';

//import { SpinnerService } from './spinner.service';
@Injectable({
  providedIn: 'root',
})
export class InterceptorserviceService implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    //this.spinner.isLoading.next(true);
   // let authservice = this.injector.get(AuthService);
    request = request.clone({
      setHeaders: {
     //   Authorization: `Bearer ${authservice.gettoken()}`,
      },
    });
    return next.handle(request).pipe(
      finalize(
        () => {
      //    this.spinner.isLoading.next(false);
          }
      )
      );
    }
    }      
