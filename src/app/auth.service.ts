/*********************************************************************************
 *  WEB422 – Assignment 6
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.
 *
 *  Name: Iurii Kondrakov Student ID: 113202196 Date: 04.15.2021
 *
 ********************************************************************************/

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {User} from './User';
import {RegisterUser} from './RegisterUser';
import {getToken} from 'codelyzer/angular/styles/cssLexer';

const helper = new JwtHelperService();

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    public getToken() {
        return localStorage.getItem('access-token');
    }

    public readToken() {
        const token = localStorage.getItem('access-token');
        return helper.decodeToken(token);
    }

    public isAuthenticated() {
        const token = localStorage.getItem('access-token');
        return token && !helper.isTokenExpired(token);

    }

    public login(user : User) {
        return this.http.post(`${environment.userAPIBase}/login`, user);
    }

    public logout() {
        localStorage.removeItem('access-token');
    }

    public register(user : RegisterUser) {
        return this.http.post(`${environment.userAPIBase}/register`, user);
    }
}
