import { Component, OnInit } from '@angular/core';
import { FirebaseAuthService } from "../services/firebase-auth.service";
import { Router } from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'login-page',
    templateUrl: 'login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {

    public error:any;

    constructor(private router: Router, private firebaseAuthService: FirebaseAuthService) { }

    ngOnInit() {

    }

    loginWithEmail(event, email, password) {
        event.preventDefault();
        this.firebaseAuthService.loginWithEmail(email, password).then((test) => {
            this.router.navigate(['']);
        })
            .catch((error: any) => {
                if (error) {
                    this.error = error;
                    console.log(this.error);
                }
            });
    }

}