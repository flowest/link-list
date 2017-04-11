import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Theme } from "../definitions/theme";
import { Link } from "../definitions/link";
import { ThemesService } from "../services/themes.service";
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
        pictureLink: ""
    };
    private formIsValid = false;

    currentTheme: Theme;

    constructor(private route: ActivatedRoute, private themeService: ThemesService, private firebaseAuthService: FirebaseAuthService) { }

    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => this.themeService.getThemeByIdFirebase(params['id']))
            .subscribe(theme => { this.currentTheme = theme });
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
        if (newLink.pictureLink == "") {
            newLink.pictureLink = "https://angular.io/resources/images/logos/angular2/angular.svg"
        }
        if (this.currentTheme.links == null) {
            this.firebaseAuthService.af.database.object('themes/' + this.currentTheme.id + '/links').set(
                [{
                    name: newLink.name,
                    author: newLink.author,
                    comment: newLink.comment,
                    linkURL: newLink.linkURL,
                    pictureURL: newLink.pictureLink
                }]
            ).then(() => {
                console.log("there were no links before");
                this.clearInputField();
                this.themeService.getThemeByIdFirebase(this.currentTheme.id).then(theme => this.currentTheme = theme);
            });
        }
        else {
            var newLinkArray: Link[] = this.currentTheme.links;
            newLinkArray.push(newLink);
            this.firebaseAuthService.af.database.object('themes/' + this.currentTheme.id + '/links')
                .set(newLinkArray)
                .catch(error => console.log(error))
                .then(() => {
                    console.log("inserted link");
                    this.clearInputField();
                });
        }
    }

    clearInputField() {
        this.newLink = {
            author: "",
            comment: "",
            linkURL: "",
            name: "",
            pictureLink: ""
        };
        this.formIsValid = false;
    }


}