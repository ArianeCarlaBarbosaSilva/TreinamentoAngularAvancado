import { NgModule } from '@angular/core';

import { CategoriesRoutingModule } from './categories-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';


@NgModule({
  declarations: [
    CategoryListComponent, 
    CategoryDetailComponent
  ],
  imports: [
    SharedModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
