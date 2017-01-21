// Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Reducers
import { mainReducer } from './model/main-reducer';
import { productReducer } from './model/product-reducer';
import { profileReducer } from './model/profile-reducer';

// Components
import { ApitestComponent } from './view/apitest/apitest.component';
import { ApiviewComponent } from './view/apitest/apiview/apiview.component';
import { AppComponent } from './app.component';
import { BuddyItemComponent } from './view/buddy-store/buddy-item/buddy-item.component';
import { BuddySidebarComponent } from './view/buddy-sidebar/buddy-sidebar.component';
import { BuddySnackbarComponent } from './view/buddy-snackbar/buddy-snackbar.component';
import { BuddyStoreComponent } from './view/buddy-store/buddy-store.component';
import { ProfileComponent } from './view/buddy-sidebar/profile/profile.component';

// Services
import { ApiService } from './shared/api.service';
import { ModelModule } from './model/model.module';
import { StoreModule } from '@ngrx/store';

// Dev
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { MockData } from './model/mock-data';
// import { ApitestModule } from './view/apitest/apitest.module';
// import { ApitestService } from './view/apitest/apitest.service';

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

    InMemoryWebApiModule.forRoot(MockData), // only for dev

    StoreModule.provideStore({
      main: mainReducer,
      profile: profileReducer,
      products: productReducer,
    }),

  ],
  providers: [ ApiService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
