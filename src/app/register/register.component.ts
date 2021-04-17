/*********************************************************************************
 *  WEB422 – Assignment 6
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.
 *
 *  Name: Iurii Kondrakov Student ID: 113202196 Date: 04.15.2021
 *
 ********************************************************************************/

import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {RegisterUser} from '../RegisterUser';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    user: RegisterUser = {userName: '', password: '', password2: ''};
    warning: any;
    success: boolean = false;
    loading: boolean = false;

    constructor(private auth: AuthService) {

    }

    ngOnInit(): void {
        this.user.userName = '';
        this.user.password = '';
        this.user.password2 = '';
    }

    onSubmit() {
        if (this.user.userName !== '') {
            if (this.user.password2 === this.user.password) {
                this.loading = true;
                this.auth.register(this.user).subscribe(msg => {
                    this.loading = false;
                    this.warning = null;
                    this.success = true;
                }, error => {
                    console.log(error)
                    this.loading = false;
                    this.warning = error.error.message;
                    this.success = false;
                });
            } else {
                this.warning = "Passwords do not match";
            }
        }
    }
}
