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
import {Router, Event, NavigationStart} from '@angular/router';
import {AuthService} from './auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
    title = 'assignment6';
    public token: any;

    searchString: string;

    constructor(private router: Router, private auth:AuthService) {
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if(event instanceof NavigationStart) {
                this.token = this.auth.readToken();
            }
        })
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']).then(() => {});
    }

    handleSearch() {
        this.router.navigate(['/search'], {queryParams: {q: this.searchString}}).then().catch();
        this.searchString = '';
    }
}
