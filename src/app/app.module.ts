import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Reducers
import { mainReducer } from './model/reducers/main-reducer';
import { productReducer } from './model/reducers/product-reducer';
import { profileReducer } from './model/reducers/profile-reducer';

// Components
import { ApitestComponent } from './view/apitest/apitest.component';
import { ApiviewComponent } from './view/apitest/apiview/apiview.component';
import { AppComponent } from './app.component';
import { BuddyItemComponent } from './view/buddy-store/buddy-item/buddy-item.component';
import { BuddySidebarComponent } from './view/buddy-sidebar/buddy-sidebar.component';
import { BuddySnackbarComponent } from './view/buddy-snackbar/buddy-snackbar.component';
import { BuddyStoreComponent } from './view/buddy-store/buddy-store.component';
import { ProfileComponent } from './view/buddy-sidebar/profile/profile.component';
import { BuddyCartComponent } from './view/buddy-sidebar/buddy-cart/buddy-cart.component';
import { BuddyCartItemComponent } from './view/buddy-sidebar/buddy-cart/buddy-cart-item/buddy-cart-item.component';

// Services
import { ApiService } from './shared/api.service';
import { ModelModule } from './model/model.module';
import { PriceDisplayPipe } from './shared/price-display.pipe';

// Dev
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { MockData } from './model/mock-data';
import { BuddyLogoComponent } from './view/buddy-sidebar/buddy-logo/buddy-logo.component';
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
    BuddyCartComponent,
    BuddyCartItemComponent,
    PriceDisplayPipe,
    BuddyLogoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore({
      main: mainReducer,
      profile: profileReducer,
      products: productReducer,
    }),
    // InMemoryWebApiModule.forRoot(MockData), // only for dev
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 