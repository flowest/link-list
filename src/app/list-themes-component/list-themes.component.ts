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
    updatedTheme: Theme = {
        name: "",
        description: "",
        keywords: [],
        author: "",
        links: [],
        authorID: ""
    };
    keywordsString: string = "";
    updateKeywordsString: string = "";

    formIsValid: boolean = false;
    updateFormIsValid: boolean = true;

    updatedThemeID: string = "";

    numberOfThemes: number;

    constructor(private themeService: ThemesService,
        private firebaseAuthService: FirebaseAuthService,
        private converterService: ConverterService) { }

    ngOnInit() {
        this.themeService.getThemesFirebase().subscribe(themes => {
            this.themes = themes;
            themes.forEach(theme => {
                theme.links = theme.links ? this.converterService.generateArrayFromFirebaseObject(theme.links) : [];
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

    deleteTheme(themeID: string, themeName: string) {
        if (confirm("Delete theme " + themeName + "?")) {
            this.themeService.deleteThemeFirebase(themeID);
        }
    }

    editUpdateTheme(themeID: string, theme: Theme) {
        theme.keywords.forEach(keyword => {
            this.updateKeywordsString += keyword + "; "
        });

        this.updatedTheme = new Theme();
        this.updatedTheme.name = theme.name;
        this.updatedTheme.description = theme.description;
        this.updatedTheme.links = theme.links;
        this.updatedTheme.author = theme.author;
        this.updatedTheme.authorID = theme.authorID;
        this.updatedTheme.keywords = theme.keywords;
        this.updatedThemeID = themeID;
    }

    updateTheme(theme: Theme) {
        this.themeService.updateThemeFirebase(this.updatedThemeID, theme);
        this.updateKeywordsString = "";
    }

    themeNameChanged(themeName: string) {
        if (themeName != "") {
            this.formIsValid = true;
        }
        else {
            this.formIsValid = false;
        }
    }

    updateThemeNameChanged(themeName: string) {
        if (themeName != "") {
            this.updateFormIsValid = true;
        }
        else {
            this.updateFormIsValid = false;
        }
    }

    keywordStringChanged(keywordsString: string) {
        keywordsString = keywordsString.replace(/\s/g, '');
        this.newTheme.keywords = keywordsString.split(';').filter(keyword => keyword != "");
    }

    updateKeywordStringChanged(keywordsString: string) {
        keywordsString = keywordsString.replace(/\s/g, '');
        this.updatedTheme.keywords = keywordsString.split(';').filter(keyword => keyword != "");
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