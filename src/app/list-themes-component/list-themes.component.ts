import { Component, OnInit } from '@angular/core';
import { ThemesService } from "../services/themes.service";
import { FirebaseAuthService } from "../services/firebase-auth.service";
import { ConverterService } from "../services/conerter.service";
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
        links: [],
        authorID: ""
    };
    keywordsString: string = "";
    formIsValid: boolean = false;
    numberOfThemes: number;

    constructor(private themeService: ThemesService,
        private firebaseAuthService: FirebaseAuthService,
        private converterService: ConverterService) { }

    ngOnInit() {
        this.themeService.getThemesFirebase().subscribe(themes => {
            this.themes = themes;
            themes.forEach(theme => {
                theme.links = theme.links ? this.converterService.generateArray(theme.links) : [];
            });
        });
    }

    addNewTheme(newtheme: Theme): void {
        newtheme.author = this.firebaseAuthService.displayName;
        newtheme.authorID = this.firebaseAuthService.uid;
        newtheme.links = [];
        this.themeService.addNewThemeFirebase(newtheme);
        this.clearInputfields();
    }

    deleteTheme(themeID: string, themeName:string) {
        if (confirm("Delete theme " + themeName + "?")) {
            this.themeService.deleteThemeFirebase(themeID);
        }
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
            links: [],
            authorID: ""
        };
        this.keywordsString = "";
        this.formIsValid = false;
    }

}