import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'new', component: CategoryDetailComponent },
  { path: ':id/edit', component: CategoryDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
