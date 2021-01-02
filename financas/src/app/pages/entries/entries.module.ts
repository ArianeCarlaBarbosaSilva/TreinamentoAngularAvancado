import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EntriesRoutingModule } from './entries-routing.module';

import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';

import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';


@NgModule({
  declarations: [
    EntryListComponent,
    EntryDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    IMaskModule,
    EntriesRoutingModule
  ]
})
export class EntriesModule { }
