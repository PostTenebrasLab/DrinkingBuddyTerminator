import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { mainReducer } from './model/main-reducer';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BuddySidebarComponent } from './view/buddy-sidebar/buddy-sidebar.component';
import { BuddyStoreComponent } from './view/buddy-store/buddy-store.component';
import { ModelModule } from './model/model.module';

import { TestService } from './shared/test.service';
import { BuddyItemComponent } from './view/buddy-store/buddy-item/buddy-item.component';

@NgModule({
  declarations: [
    AppComponent,
    BuddySidebarComponent,
    BuddyStoreComponent,
    BuddyItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModelModule,

    StoreModule.provideStore({
      data: mainReducer,
    }),
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
