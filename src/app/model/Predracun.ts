import { Proizvod } from "./Proizvod";

export interface Predracun {
    brojponude?: string;
    ime?: string;
    datumIzdavanja?: Date;
    datumVazenja?: Date;
    status: string;
    deposit?: number;
    mesto?: string;
    popust?: number;
    proizvodi?: Array<Proizvod>;
    ukupno?: number;
    godina?: Date;
    klijentUid?: string;
}