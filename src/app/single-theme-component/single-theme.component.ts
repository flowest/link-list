import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FirebaseApp } from "angularfire2";

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

    firebaseApp: firebase.app.App;

    constructor(private route: ActivatedRoute,
        private themeService: ThemesService,
        private linksService: LinksService,
        private firebaseAuthService: FirebaseAuthService,
        private converterService: ConverterService,
        @Inject(FirebaseApp) firebaseApp: firebase.app.App) {

        this.firebaseApp = firebaseApp

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

        this.linksService.addLinkToThemeFirebase(newLink, this.currentThemeID).then(newItemKey => {
            this.uploadImageToFirebaseStorage([(<HTMLInputElement>document.getElementById('file')).files[0]], newItemKey)
                .then(urlFromFirebaseStorage => {
                    this.linksService.updatePictureLinkFirebase(urlFromFirebaseStorage, this.currentThemeID, newItemKey);
                });
        });



    }

    deleteLink(linkID: string, linkName: string) {
        if (confirm("Do you want to delete " + linkName + "?")) {
            var storageRef = this.firebaseApp.storage().ref();
            var dir: string = "/link_imgs/";
            var reference = storageRef.child(dir + linkID);

            this.linksService.deleteLinkFirebase(linkID, this.currentThemeID, reference);

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

    uploadImageToFirebaseStorage(selectedFiles: File[], linkItemKey: string): Promise<string> {

        if (selectedFiles[0] != undefined) {
            var storageRef = this.firebaseApp.storage().ref();
            var dir: string = "/link_imgs/";
            var reference = storageRef.child(dir + linkItemKey);

            return new Promise(resolve => {
                reference.put(selectedFiles[0]).then((snapshot) => {
                    storageRef.child(dir + linkItemKey).getDownloadURL().then(function (urlFromFirebaseStorage) {
                        resolve(urlFromFirebaseStorage);
                    });
                });

            });
        }
        else {
            return new Promise(resolve => {
                resolve("https://angular.io/resources/images/logos/angular/angular.svg");
            });
        }




    }

}