import { Injectable } from '@angular/core';

import { Theme } from "../definitions/theme";
import { THEMES } from "./mocks/mock-themes";

import { FirebaseAuthService } from "./firebase-auth.service"

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ThemesService {

    constructor(private firebaseAuthService: FirebaseAuthService) { }

    getThemes(): Promise<Theme[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(Promise.resolve(THEMES)), 1000);
        });
    }

    getThemeById(id: string): Promise<Theme> {
        return this.getThemes().then(themes => themes.find(theme => theme.id === id));
    }

    getThemesFirebase(): Promise<Theme[]> {
        return this.firebaseAuthService.af.database.list('/themes').map(themes => { return themes }).toPromise();
    }
}