import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListThemesComponent } from "./list-themes-component/list-themes.component";
import { SingleThemeComponent } from "./single-theme-component/single-theme.component";
import { DashboardComponent } from "./dashboard-component/dashboard.component";
import { LoginPageComponent } from "./login-page-component/login-page.component";
import { RegistrationComponent } from "./registration-component/registration.component";

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'list-themes', component: ListThemesComponent },
    { path: 'single-theme/:id', component: SingleThemeComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegistrationComponent }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }