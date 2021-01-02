import { NgModule } from '@angular/core';

import { EntriesRoutingModule } from './entries-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CalendarModule } from 'primeng/calendar';
import { IMaskModule } from 'angular-imask';

import { EntryListComponent } from './entry-list/entry-list.component';
import { EntryDetailComponent } from './entry-detail/entry-detail.component';



@NgModule({
  declarations: [
    EntryListComponent,
    EntryDetailComponent
  ],
  imports: [
    SharedModule,
    CalendarModule,
    IMaskModule,
    EntriesRoutingModule
  ]
})
export class EntriesModule { }
