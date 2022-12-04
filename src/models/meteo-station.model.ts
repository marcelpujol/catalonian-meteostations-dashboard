import { Catalogue } from './catalogue.model';

export interface MeteoStation {
    code: string;
    name: string;
    town: Catalogue;
    land: Catalogue;
    region: Catalogue;
    state: Catalogue;
}