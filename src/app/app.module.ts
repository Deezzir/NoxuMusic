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
import {BrowserModule} from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import {faGithub, faYoutube, faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AboutComponent} from './about/about.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NewReleasesComponent} from './new-releases/new-releases.component';
import {AlbumComponent} from './album/album.component';
import {ArtistDiscographyComponent} from './artist-discography/artist-discography.component';
import {SearchResultComponent} from './search-result/search-result.component';
import {FavouritesComponent} from './favourites/favourites.component';
import {RegisterComponent} from './register/register.component';
import {UtilsService} from './utils.service';
import {LoginComponent} from './login/login.component';
import {InterceptTokenService} from './intercept-token.service';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        PageNotFoundComponent,
        NewReleasesComponent,
        AlbumComponent,
        ArtistDiscographyComponent,
        SearchResultComponent,
        FavouritesComponent,
        RegisterComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatMenuModule,
        MatToolbarModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatChipsModule,
        FlexLayoutModule,
        FontAwesomeModule,
        HttpClientModule,
        FormsModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptTokenService,
        multi: true
    }],
    bootstrap: [AppComponent]
})

export class AppModule {
    constructor(private library: FaIconLibrary) {
        library.addIcons(faInstagram, faFacebook, faGithub, faYoutube);
    }
}
