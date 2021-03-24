import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, NgForm} from '@angular/forms';
import {UserService} from '../../service/back/user.service';
import {UUID} from '../../helper/UUID';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit {
  user: User = {
    name: '',
    email: '',
    password: ''
  }
  confirmation: string;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  saveUser(user: NgForm) {
    if (user.invalid) {
      Object.values( user.controls ).map(cont => cont.markAsTouched());
      return;
    } else {
      this.user = user.value;
      this.userService.addUser(this.user).subscribe( (resp: UUID) => {
        console.log(resp);
      });
    }
  }

  getEmailErrorMessage(inputmail: string) {
    const email = new FormControl(inputmail, [Validators.required, Validators.email]);
    if (email.hasError('required')) {
      return `le mail est necessaire`;
    }
    return email.hasError('email') ? 'Not a valid email' : '';
  }
}

export interface User {
  name: string;
  email: string;
  password: string;
}
