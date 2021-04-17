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
import {ActivatedRoute} from '@angular/router';
import {MusicDataService} from '../music-data.service';
import {OnDestroy} from '@angular/core';

@Component({
    selector: 'app-artist-discography',
    templateUrl: './artist-discography.component.html',
    styleUrls: ['./artist-discography.component.css'],
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {
    albums: any;
    artist: any;
    loading = true;

    private paramsSub: any;
    private artistSub: any;
    private albumsSub: any;

    constructor(public utils: UtilsService, private router: ActivatedRoute, private data: MusicDataService) {
    }

    ngOnInit(): void {
        this.paramsSub = this.router.params.subscribe(params => {
            this.artistSub = this.data.getArtistById(params['id']).subscribe(artist => {
                this.artist = artist;
                this.setLoading();
            });
            this.albumsSub = this.data.getAlbumsByArtist(params['id']).subscribe(albums => {
                this.albums = this.removeAlbumDuplicates(albums.items);
                this.setLoading();
            });
        });
    }

    private setLoading(): void {
      if(this.artist && this.albums) {
          this.loading = false;
      }
    }

    ngOnDestroy(): void {
        this.artistSub.unsubscribe();
        this.albumsSub.unsubscribe();
        this.paramsSub.unsubscribe();
    }

    private removeAlbumDuplicates(list) {
        let seen = {};
        return list.filter(item => {
            let name = item.name.toLowerCase();
            return seen.hasOwnProperty(name) ? false : (seen[name] = true);
        });
    }

}
