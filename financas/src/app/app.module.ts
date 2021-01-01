import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IMaskModule } from 'angular-imask';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IMaskModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
