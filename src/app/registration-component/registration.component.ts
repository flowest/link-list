import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from "../services/firebase-auth.service";
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'registration',
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.css'],
})
export class RegistrationComponent implements OnInit {
    public error: any;

    constructor(private router: Router, private firebaseAuthService: FirebaseAuthService) { }

    register(event, name, email, password) {
        event.preventDefault();
        this.firebaseAuthService.registerUser(email, password).then((user) => {
            this.firebaseAuthService.saveUserInfoFromForm(user.uid, name, email).then(() => {
                this.router.navigate(['']);
            })
                .catch((error) => {
                    this.error = error;
                });
        })
            .catch((error) => {
                this.error = error;
                console.log(this.error);
            });
    }

    ngOnInit() {

    }

}