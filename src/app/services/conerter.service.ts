import { Injectable } from '@angular/core';

@Injectable()
export class ConverterService {

    constructor() { }

    generateArrayFromFirebaseObject(obj): any[] {
        var links = Object.keys(obj).map((key) => { return obj[key] });
        links.forEach((link, index) => {
            link['uid'] = Object.keys(obj)[index];
        });
        return links;
    }
}