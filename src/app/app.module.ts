import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ApiService } from './shared/api.service';

import { mainReducer } from './model/main-reducer';
import { StoreModule } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BuddySidebarComponent } from './view/buddy-sidebar/buddy-sidebar.component';
import { BuddyStoreComponent } from './view/buddy-store/buddy-store.component';
import { ModelModule } from './model/model.module';

import { TestService } from './shared/test.service';
import { BuddyItemComponent } from './view/buddy-store/buddy-item/buddy-item.component';
// import { ApitestModule } from './view/apitest/apitest.module';
import { ApitestComponent } from './view/apitest/apitest.component';
import { ApiviewComponent } from './view/apitest/apiview/apiview.component';
import { ApitestService } from './view/apitest/apitest.service';

@NgModule({
  declarations: [
    AppComponent,
    BuddySidebarComponent,
    BuddyStoreComponent,
    BuddyItemComponent,
    ApitestComponent,
    ApiviewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModelModule,

    StoreModule.provideStore({
      products: mainReducer,
      profile: profileReducer,
    }),

  ],
  providers: [TestService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
