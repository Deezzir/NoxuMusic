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
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {User} from '../User';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: User = {userName: '', password: '', _id: null};
    warning: any;
    loading: boolean = false;

    constructor(private auth: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        this.user.userName = '';
        this.user.password = '';
        this.user._id = null;
    }

    onSubmit() {
        if (this.user.userName !== '' && this.user.password !== '') {
            this.loading = true;
            this.auth.login(this.user).subscribe((success: any) => {
                this.loading = false;
                localStorage.setItem('access-token', success.token);
                this.router.navigate(['/newReleases']);
            }, (error) => {
                this.loading = false;
                this.warning = error.error.message;
            });
        }
    }
}
