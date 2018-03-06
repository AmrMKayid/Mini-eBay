import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { StoreComponent } from './store/store.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'items',
        // TODO
        canActivate: [ AuthGuardService],
        component: ItemsComponent
      },
      { path: 'store',
        component: StoreComponent
      },
      {
        path: 'team',
        component: TeamComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'cart',
        canActivate: [ AuthGuardService],
        component: CartComponent
      },
      {
        path: 'profile',
        canActivate: [ AuthGuardService],
        component: ProfileComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DashboardRoutingModule {}
