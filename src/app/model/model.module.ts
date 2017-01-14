import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockData } from './mock-data';

import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';

@NgModule({
  imports: [
    CommonModule,
    // InMemoryWebApiModule.forRoot(MockData) // only for dev
  ],
  declarations: []
})
export class ModelModule { }
