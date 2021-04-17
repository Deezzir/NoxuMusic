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

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    getFormattedDate(date: string): string {
        let parsedDate = new Date(Date.parse(date));
        let month = (parsedDate.getMonth() + 1).toString();
        let day = parsedDate.getDate().toString();
        let year = parsedDate.getFullYear().toString();

        return month + '/' + day + '/' + year.slice(2);
    }

    constructor() {
    }
}
