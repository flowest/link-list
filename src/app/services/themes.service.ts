import { Injectable } from '@angular/core';

import { Theme } from "../definitions/theme";
import { THEMES } from "./mocks/mock-themes";

@Injectable()
export class ThemesService {

    getThemes(): Promise<Theme[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(Promise.resolve(THEMES)), 1000);
        });
    }

    getThemeById(id: string): Promise<Theme> {
        return this.getThemes().then(themes => themes.find(theme => theme.id === id));
    }
}