import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListThemesComponent } from "./list-themes-component/list-themes.component";
import { SingleThemeComponent } from "./single-theme-component/single-theme.component";
import { DashboardComponent } from "./dashboard-component/dashboard.component";

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'list-themes', component: ListThemesComponent },
    { path: 'single-theme/:id', component: SingleThemeComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }