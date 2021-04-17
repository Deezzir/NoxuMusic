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
import {UtilsService} from '../utils.service';
import {MusicDataService} from '../music-data.service';

@Component({
    selector: 'app-new-releases',
    templateUrl: './new-releases.component.html',
    styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {
    releases: any;
    loading = true;

    private dataSub;

    constructor(public utils: UtilsService, private data: MusicDataService) {
    }

    ngOnInit(): void {
        this.dataSub = this.data.getNewReleases().subscribe(releases => {
            this.releases = releases.albums.items;
            this.loading = false;
        });
    }

}
