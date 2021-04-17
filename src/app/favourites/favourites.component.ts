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
import {MusicDataService} from '../music-data.service';

@Component({
    selector: 'app-favourites',
    templateUrl: './favourites.component.html',
    styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
    favourites: Array<any>;

    private dataSub: any;
    private removeSub: any;
    loading = true;

    constructor(private data: MusicDataService) {
    }

    ngOnInit(): void {
        this.dataSub = this.data.getFavourites().subscribe(data => {
            this.favourites = data.tracks;
            this.loading = false;
        });
    }

    removeFromFavourites(id) {
        this.loading = true
        this.removeSub = this.data.removeFromFavourites(id).subscribe(data => {
            this.favourites = data.tracks;
            this.loading = false;
        });
    }

}
