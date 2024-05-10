import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { PagesModule } from "./pages/pages.module";
import { OrderByPipe } from './order-by.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {authInterceptorProviders, UniversalAppInterceptor} from "./shared/header/UniversalAppInterceptor";
import {SharedModule} from "./shared/shared.module";


@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ScrollToModule.forRoot(),
    FormsModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule
  ],

  providers: [authInterceptorProviders
  //   {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: UniversalAppInterceptor,
  //   multi: true,
  // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
