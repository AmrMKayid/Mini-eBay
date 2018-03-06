import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ToasterService } from 'angular5-toaster';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() position = 'normal';
  user: any;
  userMenu: any[];



  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: AuthService,
    private router: Router,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this.userMenu = [{ title: 'Profile' }, { title: 'Logout' }];
    if(JSON.parse(localStorage.getItem('currentUser')))
      this.user = JSON.parse(localStorage.getItem('currentUser')).user;
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  signup() {
    this.router.navigate(['dashboard/signup']);
  }

  login() {
    this.router.navigate(['dashboard/login']);
  }

  onMenuClick(event) {

    if (event.title === 'Profile') {
        this.toaster.pop({
          type: 'success',
          title: "Success!",
          body: "You'll go to profile",
          timeout: 3000
        });
        this.router.navigate(['dashboard/profile']);
    }

    else if (event.title === 'Logout') {
        this.authService.logout();
        this.toaster.pop({
          type: 'success',
          title: "Success!",
          body: "You've been logged out ... Bye!",
          timeout: 3000
        });
        this.router.navigate(['dashboard/login']);
    }
  }
}
