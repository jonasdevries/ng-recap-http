import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {AuthInterceptService} from './auth-intercept.service';
import {LoggingInterceptService} from './logging-intercept.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [ // interceptor order is IMPORTANT
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptService,
    multi: true
  },
    {provide: HTTP_INTERCEPTORS,
     useClass: LoggingInterceptService,
     multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
