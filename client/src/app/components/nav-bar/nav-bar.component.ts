import { Component, OnInit } from '@angular/core'; 

import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.userService.logout();
  }

}
