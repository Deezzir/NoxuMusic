/*********************************************************************************
 *  WEB422 – Assignment 6
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.
 *
 *  Name: Iurii Kondrakov Student ID: 113202196 Date: 04.15.2021
 *
 ********************************************************************************/

import {Component, OnDestroy, OnInit} from '@angular/core';
import {UtilsService} from '../utils.service';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MusicDataService} from '../music-data.service';


@Component({
    selector: 'app-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {
    loading = true;
    album: any;
    private paramsSub: any;
    private albumSub: any;

    constructor(public utils: UtilsService, private router: ActivatedRoute, private bar: MatSnackBar, private data: MusicDataService) {
    }

    ngOnInit(): void {
        this.paramsSub = this.router.params.subscribe(params => {
            this.albumSub = this.data.getAlbumById(params['id']).subscribe(album => {
                this.album = album;
                this.loading = false;
            });
        });
    }

    ngOnDestroy(): void {
        this.albumSub.unsubscribe();
        this.paramsSub.unsubscribe();
    }

    addToFavourites(trackId): void {
        if (trackId) {
            this.data.addToFavourites(trackId).subscribe((data: any) => {
                if (data.tracks.length > 0) {
                    this.bar.open('Adding to Favourites...', 'Done', {duration: 1500});
                } else {
                    this.bar.open('Unable to add song to Favourites', 'Error', {duration: 1000});
                }
            })
        }
    }
}
