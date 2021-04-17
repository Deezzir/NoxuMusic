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
import {ActivatedRoute} from '@angular/router';
import {MusicDataService} from '../music-data.service';
import {OnDestroy} from '@angular/core';

@Component({
    selector: 'app-search-result',
    templateUrl: './search-result.component.html',
    styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {
    results: any;
    searchQuery: any;

    loading = true;

    private paramsSub: any;
    private artistsSub: any;

    constructor(private router: ActivatedRoute, private data: MusicDataService) {
    }

    ngOnInit(): void {
        this.paramsSub = this.router.queryParams.subscribe(params => {
            this.searchQuery = params['q'];
            this.artistsSub = this.data.searchArtists(params['q']).subscribe(data => {
                this.results = this.removeEmptyArtists(data.artists.items);
                this.loading = false;
            });
        });
    }

    ngOnDestroy(): void {
        this.artistsSub.unsubscribe();
        this.paramsSub.unsubscribe();
    }

    private removeEmptyArtists(list) {
        return list.filter(item => {
            return item.images.length > 0;
        });
    }

}
