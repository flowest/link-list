import { Component } from '@angular/core';
import { FirebaseAuthService } from "./services/firebase-auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LinkList';
  isLoggedIn: boolean;
  userName: string;

  constructor(private router: Router, private firebaseAuthService: FirebaseAuthService) {
    this.firebaseAuthService.af.auth.subscribe(
      (auth) => {
        if (auth == null) {
          console.log("Not Logged in.");
          this.router.navigate(['login']);
          this.isLoggedIn = false;
        }
        else {
          console.log("Successfully Logged in.");
          this.firebaseAuthService.displayName = auth.auth.displayName;
          this.firebaseAuthService.email = auth.auth.email;
          this.isLoggedIn = true;
          this.router.navigate(['']);
          //console.log(auth);

          if (this.isLoggedIn) {
            this.firebaseAuthService.af.database
              .list('/registeredUsers/' + auth.auth.uid)
              .subscribe(user => {
                this.userName = user[1].$value;
                this.firebaseAuthService.displayName = this.userName;
                console.log("loggid in as: " + this.userName);
              });

          }
        }
      }
    );
  }

  logout() {
    this.firebaseAuthService.logout();
    this.isLoggedIn = false;
  }
}
