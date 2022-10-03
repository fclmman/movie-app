import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {IonicStorageModule} from '@ionic/storage-angular';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Drivers} from '@ionic/storage';
import {TokenInterceptorService} from './interceptor/token-interceptor.service';
import {ApiPathInterceptorService} from './interceptor/api-path-interceptor.service';
import {UserService} from './service/user.service';

const initializeApp = (user: UserService) => async () => user.initToken();

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    })

  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    deps: [UserService],
    multi: true
  }, {
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiPathInterceptorService,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
