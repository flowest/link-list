import { Injectable } from '@angular/core';

import { Theme } from "../definitions/theme";
import { Link } from "../definitions/link";
import { THEMES } from "./mocks/mock-themes";

import { FirebaseAuthService } from "./firebase-auth.service"

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThemesService {

    constructor(private firebaseAuthService: FirebaseAuthService) { }

    getThemes(): Promise<Theme[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(Promise.resolve(THEMES)), 1000);
        });
    }

    getThemeById(id: string): Promise<Theme> {
        return this.getThemes().then(themes => themes.find(theme => theme.name == "asd"));
    }

    getThemesFirebase(): Observable<Theme[]> {
        return this.firebaseAuthService.af.database.list('/themes').map(themes => { return themes });
    }

    getThemeByIdFirebase(id: string): Observable<Theme> {
        return this.firebaseAuthService.af.database.object('/themes/' + id).map(theme => { return theme });
    }

    addNewThemeFirebase(theme: Theme) {
        this.firebaseAuthService.af.database.list('/themes').push(theme).catch(error => console.log(error));
    }

    deleteThemeFirebase(themeID: string) {
        this.firebaseAuthService.af.database.list('/themes').remove(themeID)
            .catch(error => console.log(error))
            .then(success => console.log("success"));
    }
}