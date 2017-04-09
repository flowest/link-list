import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from "angularfire2";

import { AppComponent } from './app.component';
import { ListThemesComponent } from "./list-themes-component/list-themes.component";
import { SingleThemeComponent } from "./single-theme-component/single-theme.component";
import { DashboardComponent } from "./dashboard-component/dashboard.component";
import { LoginPageComponent } from "./login-page-component/login-page.component";
import { RegistrationComponent } from "./registration-component/registration.component";

import { ThemesService } from "./services/themes.service";
import { FirebaseAuthService } from "./services/firebase-auth.service";

import { ModalModule } from "ngx-bootstrap/modal";

import { AppRoutingModule } from "./app-routing.module";

export const firebaseConfig = {
  apiKey: 'AIzaSyCabdWt_H34vqbB52fIBehfCinBQD9giwU',
  authDomain: 'linklist-cba66.firebaseapp.com',
  databaseURL: 'https://linklist-cba66.firebaseio.com',
  projectId: "linklist-cba66",
  storageBucket: "linklist-cba66.appspot.com",
  messagingSenderId: "345644213763"
};

@NgModule({
  declarations: [
    AppComponent,
    ListThemesComponent,
    SingleThemeComponent,
    DashboardComponent,
    LoginPageComponent,
    RegistrationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AppRoutingModule,
    ModalModule.forRoot(),
  ],
  providers: [ThemesService,FirebaseAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
