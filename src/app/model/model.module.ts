// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

// Reducers
import { mainReducer }    from './reducers/main-reducer';
import { productReducer } from './reducers/product-reducer';
import { profileReducer } from './reducers/profile-reducer';


@NgModule({
  imports: [
    CommonModule,

    StoreModule.provideStore({
      main: mainReducer,
      profile: profileReducer,
      products: productReducer,
    }),

  ],
  declarations: []
})
export class ModelModule { }
