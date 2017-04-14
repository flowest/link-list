import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Theme } from "../definitions/theme";
import { Link } from "../definitions/link";
import { ThemesService } from "../services/themes.service";
import { LinksService } from "../services/links.service";
import { ConverterService } from "../services/conerter.service";
import { FirebaseAuthService } from "../services/firebase-auth.service";

import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'single-theme',
    templateUrl: 'single-theme.component.html'
})
export class SingleThemeComponent implements OnInit {

    private newLink: Link = {
        author: "",
        comment: "",
        linkURL: "",
        name: "",
        pictureLink: "",
        authorID: ""
    };
    private formIsValid = false;

    currentTheme: Theme;
    currentThemeID: string;

    constructor(private route: ActivatedRoute,
        private themeService: ThemesService,
        private linksService: LinksService,
        private firebaseAuthService: FirebaseAuthService,
        private converterService: ConverterService) {

        this.route.params
            //.switchMap((params: Params) => this.themeService.getThemeByIdFirebase(params['id']))
            .subscribe(params => {
                this.themeService.getThemeByIdFirebase(params['id']).subscribe(theme => {
                    this.currentTheme = theme;
                    this.currentTheme.links = this.currentTheme.links ? this.converterService.generateArray(this.currentTheme.links) : [];
                    this.currentThemeID = params['id'];
                });
            });
    }

    ngOnInit(): void {

    }

    linkFormChanged(linkName: string, link: string) {
        if (linkName != "" && link != "") {
            this.formIsValid = true;
        }
        else {
            this.formIsValid = false;
        }
    }

    addNewLink(newLink: Link) {
        newLink.author = this.firebaseAuthService.displayName;
        newLink.authorID = this.firebaseAuthService.uid;
        if (newLink.pictureLink == "") {
            newLink.pictureLink = "https://angular.io/resources/images/logos/angular2/angular.svg"
        }
        this.linksService.addLinkToThemeFirebase(newLink, this.currentThemeID);

    }

    clearInputField() {
        this.newLink = {
            author: "",
            comment: "",
            linkURL: "",
            name: "",
            pictureLink: "",
            authorID: ""
        };
        this.formIsValid = false;
    }


}