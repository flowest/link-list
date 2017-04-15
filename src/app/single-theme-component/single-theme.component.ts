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

    private updatedLink: Link = {
        author: "",
        authorID: "",
        comment: "",
        linkURL: "",
        name: "",
        pictureLink: "",
    }

    private updateLinkID: string = "";

    private formIsValid: boolean = false;
    private updateFormIsValid: boolean = true;

    currentTheme: Theme;
    currentThemeID: string;

    constructor(private route: ActivatedRoute,
        private themeService: ThemesService,
        private linksService: LinksService,
        private firebaseAuthService: FirebaseAuthService,
        private converterService: ConverterService) {

        this.route.params
            .subscribe(params => {
                this.themeService.getThemeByIdFirebase(params['id']).subscribe(theme => {
                    this.currentTheme = theme;
                    this.currentTheme.links = this.currentTheme.links ? this.converterService.generateArrayFromFirebaseObject(this.currentTheme.links) : [];
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

    editLinkFormChanged(linkName: string, link: string) {
        if (linkName != "" && link != "") {
            this.updateFormIsValid = true;
        }
        else {
            this.updateFormIsValid = false;
        }
    }

    addNewLink(newLink: Link) {
        newLink.author = this.firebaseAuthService.displayName;
        newLink.authorID = this.firebaseAuthService.uid;
        if (newLink.linkURL.startsWith("http") == false) {
            newLink.linkURL = "http://" + newLink.linkURL;
        }
        if (newLink.pictureLink == "") {
            newLink.pictureLink = "https://angular.io/resources/images/logos/angular/angular.svg"
        }
        else if (newLink.pictureLink.startsWith("http") == false) {
            newLink.pictureLink = "http://" + newLink.pictureLink;
        }
        this.linksService.addLinkToThemeFirebase(newLink, this.currentThemeID);

    }

    deleteLink(linkID: string, linkName: string) {
        if (confirm("Do you want to delete " + linkName + "?")) {
            this.linksService.deleteLinkFirebase(linkID, this.currentThemeID);
        }
    }

    editLink(linkID: string, link: Link) {
        this.updatedLink = new Link();
        this.updatedLink.author = link.author;
        this.updatedLink.authorID = link.authorID;
        this.updatedLink.comment = link.comment;
        this.updatedLink.linkURL = link.linkURL;
        this.updatedLink.name = link.name;
        this.updatedLink.pictureLink = link.pictureLink;

        this.updateLinkID = linkID;
    }

    updateLink(link: Link) {
        this.linksService.updateLinkFirebase(this.updateLinkID, link, this.currentThemeID);
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