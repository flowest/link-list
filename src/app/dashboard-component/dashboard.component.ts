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

}