import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Theme } from "../definitions/theme";
import { ThemesService } from "../services/themes.service";

import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'single-theme',
    templateUrl: 'single-theme.component.html'
})
export class SingleThemeComponent implements OnInit {

    currentTheme:Theme;

    constructor(private route: ActivatedRoute, private themeService:ThemesService) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.themeService.getThemeById(params['id']))
            .subscribe(theme => this.currentTheme = theme);
    }


}