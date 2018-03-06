import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
        <router-outlet (activate)="onActivate($event)"></router-outlet>`
})
export class AppComponent {
  // Scroll up to the top of the page on changing the route
  onActivate(event) {
    window.scroll(0, 0);
  }
}
