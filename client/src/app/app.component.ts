import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router'




@Component({
  selector: 'app-root',
  template: `
  <router-outlet></router-outlet>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../assets/styles/tachyons.scss']
})

export class AppComponent {

  constructor (
    private router: Router
  ){}

}
