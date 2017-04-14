import { Injectable } from '@angular/core';

import { Theme } from "../definitions/theme";
import { Link } from "../definitions/link";

import { FirebaseAuthService } from "./firebase-auth.service"

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LinksService {

    constructor(private firebaseAuthService: FirebaseAuthService) { }

    getLinksForThemeFirebase(themeID: string): Observable<Link[]> {
        return this.firebaseAuthService.af.database.list('/themes/' + themeID + '/links').map(links => { return links });
    }

    addLinkToThemeFirebase(link: Link, themeID: string) {
        this.firebaseAuthService.af.database.list('/themes/' + themeID + '/links').push(link).catch(error => console.log(error));
    }
}