import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';

const routes: Routes = [
  { path: '', component: EntryListComponent },
  { path: 'new', component: EntryDetailComponent },
  { path: ':id/edit', component: EntryDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntriesRoutingModule { }
