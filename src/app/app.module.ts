import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {AuthInterceptService} from './auth-intercept.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    {provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
