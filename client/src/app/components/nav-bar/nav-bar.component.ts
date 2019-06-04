import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
