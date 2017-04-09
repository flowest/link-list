import { Component, OnInit } from '@angular/core';
import { ThemesService } from "../services/themes.service";
import { Theme } from "../definitions/theme";

@Component({
    moduleId: module.id,
    selector: 'list-themes',
    templateUrl: 'list-themes.component.html'
})
export class ListThemesComponent implements OnInit {

    themes: Theme[];
    newTheme = {
        name: "",
        keywordsString: "",
        descrition: "",
        keywords: []
    };
    formIsValid:boolean = false;
    

    constructor(private themeService: ThemesService) { }

    ngOnInit() {
        this.themeService.getThemes().then(_themes => this.themes = _themes);
    }

    addNewTheme(newtheme: Theme): void {
        console.log(newtheme);
        this.clearInputfields();
    }

    themeNameChanged(themeName:string){
        if(themeName != ""){
            this.formIsValid = true;
        }
        else{
            this.formIsValid = false;
        }
    }

    keywordStringChanged(keywordsString:string){
        keywordsString = keywordsString.replace(/\s/g,'');
        this.newTheme.keywords = keywordsString.split(';');
    }

    private clearInputfields() {
        this.newTheme = {
            name: "",
            keywordsString: "",
            descrition: "",
            keywords: []
        };
        this.formIsValid = false;
    }

}