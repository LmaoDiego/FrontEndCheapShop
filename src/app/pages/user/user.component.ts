import {Component, OnInit, ViewChild} from '@angular/core';


import {User} from "../../models/user/user";
import {UsersApiService} from "../../services/users-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userData: User = {} as User;
  defaultUser: User = { id: 0, firstname: 'nombre', lastname: 'nombre', postalCode: 0,dateOfBirth: 'nombre',address: 'nombre', phoneNumber: 'nombre'};
  constructor(private usersApi: UsersApiService, private router: Router, private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.retrieveUser(1)
  }
  navigateToHome(): void {
    this.router.navigate(['products'])
      .then(() => console.log(this.route.url) );
  }
  retrieveUser(id: number): void {
    this.usersApi.getUserById(id)
      .subscribe((response: User) => {
        this.userData = {} as User;
        this.userData = _.cloneDeep(response);
        console.log(response);
        console.log(this.userData);
      });
  }
  updateUser(): void {
    this.usersApi.updateUser(this.userData.id, this.userData as User)
      .subscribe(response => {
        console.log(response);
      });
  }
  navigateToEditUser(userId: number): void {
    this.router.navigate([`/user/${userId}/edit`])
      .then(() => console.log('Navigated to Edit User'));
  }
}
