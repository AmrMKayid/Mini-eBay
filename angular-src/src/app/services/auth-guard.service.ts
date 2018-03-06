import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';
import { ToasterService } from 'angular5-toaster';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router,
        private toaster: ToasterService
    ) { }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }

    checkLoggedIn(url: string): boolean {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        this.toaster.pop({
            type: 'info',
            title: "Hey",
            body: "You need to login to access this page",
            timeout: 3000
          });
        this.router.navigate(['../dashboard/login']);
        return false;
    }

}
