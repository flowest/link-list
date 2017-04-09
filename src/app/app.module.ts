import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListThemesComponent } from "./list-themes-component/list-themes.component";
import { SingleThemeComponent } from "./single-theme-component/single-theme.component";
import { DashboardComponent } from "./dashboard-component/dashboard.component";

import { ThemesService } from "./services/themes.service";

import { ModalModule } from "ngx-bootstrap/modal";

import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    ListThemesComponent,
    SingleThemeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ModalModule.forRoot(),
  ],
  providers: [ThemesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
