import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDatabase } from '../in-memory-database';
import { NavbarComponent } from './components/navbar/navbar.component';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDatabase), //para interceptar as requisições http
    HttpClientModule
  ],
  exports: [
    //modulos que serao compartilhados por outros modulos da aplicação
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    //componenttes compartilhados
    NavbarComponent
  ]
})
export class CoreModule { }
