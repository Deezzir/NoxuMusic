/*********************************************************************************
 *  WEB422 – Assignment 6
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
 *  assignment has been copied manually or electronically from any other source (including web sites) or
 *  distributed to other students.
 *
 *  Name: Iurii Kondrakov Student ID: 113202196 Date: 04.15.2021
 *
 ********************************************************************************/

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from './about/about.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NewReleasesComponent} from './new-releases/new-releases.component';
import {AlbumComponent} from './album/album.component';
import {ArtistDiscographyComponent} from './artist-discography/artist-discography.component';
import {SearchResultComponent} from './search-result/search-result.component';
import {FavouritesComponent} from './favourites/favourites.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {GuardAuthService} from './guard-auth.service';

const routes: Routes = [
    {path: 'about', component: AboutComponent, canActivate: [GuardAuthService]},
    {path: 'newReleases', component: NewReleasesComponent, canActivate: [GuardAuthService]},
    {path: 'album/:id', component: AlbumComponent, canActivate: [GuardAuthService]},
    {path: 'search', component: SearchResultComponent, canActivate: [GuardAuthService]},
    {path: 'favourites', component: FavouritesComponent, canActivate: [GuardAuthService]},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'artist/:id', component: ArtistDiscographyComponent, canActivate: [GuardAuthService]},
    {path: '', redirectTo: '/newReleases', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
