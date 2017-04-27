import { Component, OnInit, Inject } from '@angular/core';

import { AngularFire, FirebaseListObservable, FirebaseApp } from 'angularfire2';

import { Observable } from 'rxjs';


@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    firebaseApp: any;

    imgUrl: string;

    constructor( @Inject(FirebaseApp) firebaseApp: any) {
        this.firebaseApp = firebaseApp
    }

    ngOnInit() {

    }

    uploadImage() {
        // Create a root reference
        let storageRef = this.firebaseApp.storage().ref();

        let success = false;
        // This currently only grabs item 0, TODO refactor it to grab them all
        for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
            //console.log(selectedFile);
            // Make local copies of services because "this" will be clobbered
            // let router = this.router;
            // let af = this.af;
            // let folder = this.folder;
            // let path = `/${this.folder}/${selectedFile.name}`;
            var iRef = storageRef.child("/img/jochen/" + selectedFile.name);
            iRef.put(selectedFile).then((snapshot) => {
                // console.log('Uploaded a blob or file! Now storing the reference at', `/${this.folder}/images/`);
                // af.database.list(`/${folder}/images/`).push({ path: path, filename: selectedFile.name })
                this.imgUrl = storageRef.child("/img/jochen/" + selectedFile.name).getDownloadURL().then(function (url){
                    console.log(url);
                });
            });
        }
    }

}