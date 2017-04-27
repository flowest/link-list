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

    addLinkToThemeFirebase(link: Link, themeID: string): Promise<string> {

        return new Promise(resolve => {
            this.firebaseAuthService.af.database.list('/themes/' + themeID + '/links').push(link).catch(error => console.log(error))
                .then(newItem => resolve(newItem.key));
        })
    }

    deleteLinkFirebase(linkID: string, themeID: string, reference: firebase.storage.Reference) {
        this.firebaseAuthService.af.database.list('/themes/' + themeID + '/links').remove(linkID)
            .catch(error => console.log(error))
            .then(_ => {
                console.log("removed link");

                this.removeImageFromFirebaseStorage(linkID, reference);
            })
    }

    updateLinkFirebase(linkID: string, link: Link, themeID: string) {
        this.firebaseAuthService.af.database.list('/themes/' + themeID + '/links').update(linkID, link)
            .catch(error => console.log(error))
            .then(_ => console.log("updated Link"))
    }

    updatePictureLinkFirebase(firebaseStorageImageUrl: string, themeID: string, linkID: string) {
        this.firebaseAuthService.af.database.object('/themes/' + themeID + '/links/' + linkID).update({
            pictureLink: firebaseStorageImageUrl
        })
    }

    removeImageFromFirebaseStorage(linkID: string, reference: firebase.storage.Reference) {
        reference.delete().then(_ => console.log("removed image from firebase storage"))

    }
}