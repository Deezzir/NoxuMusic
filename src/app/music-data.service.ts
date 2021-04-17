/*********************************************************************************
 *  WEB422 – Assignment 6
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.
 *
 *  Name: Iurii Kondrakov Student ID: 113202196 Date: 04.15.2021
 *
 ********************************************************************************/

import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SpotifyTokenService} from './spotify-token.service';
import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

import {mergeMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class MusicDataService {
    constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) {
    }

    getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
            return this.http.get<any>('https://api.spotify.com/v1/browse/new-releases', {headers: {'Authorization': `Bearer ${token}`}});
        }));
    }

    getArtistById(id): Observable<SpotifyApi.SingleArtistResponse> {
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
            return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, {headers: {'Authorization': `Bearer ${token}`}});
        }));
    }

    getAlbumsByArtist(id): Observable<SpotifyApi.ArtistsAlbumsResponse> {
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
            return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=album,single&limit=50`, {headers: {'Authorization': `Bearer ${token}`}});
        }));
    }

    getAlbumById(id): Observable<SpotifyApi.SingleAlbumResponse> {
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
            return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, {headers: {'Authorization': `Bearer ${token}`}});
        }));
    }

    searchArtists(searchString): Observable<SpotifyApi.ArtistSearchResponse> {
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
            return this.http.get<any>(`https://api.spotify.com/v1/search?q=${searchString}&type=artist&limit=50`, {headers: {'Authorization': `Bearer ${token}`}});
        }));
    }

    addToFavourites(id): Observable<SpotifyApi.MultipleTracksResponse> {
        return this.http.put<[String]>(`${environment.userAPIBase}/favourites/${id}`, {}).pipe(mergeMap(favouritesArray => {
            if (favouritesArray.length > 0) {
                return new Observable<any>(o => o.next({tracks: favouritesArray}));
            } else {
                return new Observable<any>(o => o.next({tracks: []}));
            }
        }));
    }

    removeFromFavourites(id): Observable<SpotifyApi.MultipleTracksResponse> {
        return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`).pipe(mergeMap(favouritesArray => {
            if (favouritesArray.length > 0) {
                return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
                    return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favouritesArray.join()}`, {headers: {'Authorization': `Bearer ${token}`}});
                }));
            } else {
                return new Observable<any>(o => o.next({tracks: []}));
            }
        }));
    }

    getFavourites(): Observable<SpotifyApi.MultipleTracksResponse> {
        return this.http.get<[String]>(`${environment.userAPIBase}/favourites/`).pipe(mergeMap(favouritesArray => {
            if (favouritesArray.length > 0) {
                return this.spotifyToken.getBearerToken().pipe(mergeMap(token => {
                    return this.http.get<any>(`https://api.spotify.com/v1/tracks?ids=${favouritesArray.join()}`, {headers: {'Authorization': `Bearer ${token}`}});
                }));
            } else {
                return new Observable<any>(o => o.next({tracks: []}));
            }
        }));
    }
}
