import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';

/* Search Library */
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';

/* Api Modules */
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Routing Modules */
import { DashboardRoutingModule } from './dashboard-routing.module';


/* Components Modules */
import { DashboardComponent } from './dashboard.component';
import { TeamComponent } from './team/team.component';
import { StoreComponent } from './store/store.component';
import { AboutComponent } from './about/about.component';
import { ItemsComponent } from './items/items.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CartComponent } from './cart/cart.component';

/* Services Modules */
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { StoreService } from '../services/store.service';
import {ToasterModule} from 'angular5-toaster';
import { ProfileComponent } from './profile/profile.component';




@NgModule({
  imports: [ThemeModule, DashboardRoutingModule, HttpModule, FormsModule,
    ReactiveFormsModule,ToasterModule, Ng2SearchPipeModule, Ng2OrderModule, NgxPaginationModule],
  declarations: [
    DashboardComponent,
    TeamComponent,
    StoreComponent,
    ItemsComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    CartComponent,
    ProfileComponent
  ],
  entryComponents: [],
  providers: [
    AuthService,
    UserService,
    AuthGuardService,
    StoreService
  ]
})
export class DashboardModule {}
