import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ApiService } from './shared/api.service';

import { mainReducer } from './model/main-reducer';
import { productReducer } from './model/product-reducer';
import { profileReducer } from './model/profile-reducer';
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
import { BuddySnackbarComponent } from './view/buddy-snackbar/buddy-snackbar.component';
import { ProfileComponent } from './view/buddy-sidebar/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    BuddySidebarComponent,
    BuddyStoreComponent,
    BuddyItemComponent,
    ApitestComponent,
    ApiviewComponent,
    BuddySnackbarComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ModelModule,

    StoreModule.provideStore({
      products: productReducer,
      profile: profileReducer,
      main: mainReducer,
    }),

  ],
  providers: [TestService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
