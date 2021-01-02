import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    // modulos que serão compartilhados e usados por outros modulos da aplicação
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
