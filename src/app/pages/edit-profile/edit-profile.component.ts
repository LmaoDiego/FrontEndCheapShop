import { Component, OnInit } from '@angular/core';
import {UsersApiService} from "../../services/users-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../models/user/user";
import * as _ from "lodash";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  userData: User = {} as User;
  defaultUser: User = { id: 0, firstname: 'nombre', lastname: 'nombre', postalCode: 0,dateOfBirth: 'nombre',address: 'nombre', phoneNumber: 'nombre'};
  constructor(private usersApi: UsersApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.retrieveUser(1)
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
    this.navigateToProfile()
  }
  navigateToHome(): void {
    this.router.navigate(['products'])
      .then(() => console.log(this.route.url) );
  }
  navigateToProfile(): void {
    this.router.navigate(['user'])
      .then(() => console.log(this.route.url) );
  }
}
