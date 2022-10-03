import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogoutComponent} from './logout/logout.component';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [LogoutComponent],
  exports: [LogoutComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class SharedModule {
}
