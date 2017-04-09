import { Component, OnInit } from '@angular/core';
import { ThemesService } from "../services/themes.service";
import { FirebaseAuthService } from "../services/firebase-auth.service";
import { Theme } from "../definitions/theme";

@Component({
    moduleId: module.id,
    selector: 'list-themes',
    templateUrl: 'list-themes.component.html'
})
export class ListThemesComponent implements OnInit {

    themes: Theme[];
    newTheme: Theme = {
        name: "",
        description: "",
        keywords: [],
        author: "",
        id: "",
        links: [],
    };
    keywordsString: string = "";
    formIsValid: boolean = false;
    numberOfThemes: number;

    constructor(private themeService: ThemesService, private firebaseAuthService: FirebaseAuthService) { }

    ngOnInit() {
        //this.themeService.getThemes().then(_themes => this.themes = _themes);
        this.firebaseAuthService.af.database.list('/themes').subscribe(themes => {
            this.themes = themes;
            this.numberOfThemes = themes.length;
        });
    }

    addNewTheme(newtheme: Theme): void {
        newtheme.author = this.firebaseAuthService.displayName;
        newtheme.links = [];
        newtheme.id = (this.numberOfThemes + 1).toString();
        newtheme.links = "";
        this.firebaseAuthService.af.database.object('/themes/' + newtheme.name).update(newtheme).catch(error => { console.log(error) });
        this.clearInputfields();
    }

    themeNameChanged(themeName: string) {
        if (themeName != "") {
            this.formIsValid = true;
        }
        else {
            this.formIsValid = false;
        }
    }

    keywordStringChanged(keywordsString: string) {
        keywordsString = keywordsString.replace(/\s/g, '');
        this.newTheme.keywords = keywordsString.split(';');
    }

    private clearInputfields() {
        this.newTheme = {
            name: "",
            description: "",
            keywords: [],
            author: "",
            id: "",
            links: [],
        };
        this.keywordsString = "";
        this.formIsValid = false;
    }

}