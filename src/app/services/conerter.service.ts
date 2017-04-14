import { Injectable } from '@angular/core';

@Injectable()
export class ConverterService {

    constructor() { }

    generateArray(obj): any[] {
        return Object.keys(obj).map((key) => { return obj[key] });
    }
}