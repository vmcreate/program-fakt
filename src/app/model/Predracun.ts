import { Proizvod } from "./Proizvod";

export interface Predracun {
    brojponude?: string;
    brojracuna?: string;
    ime?: string;
    datumIzdavanja?: number;
    datumVazenja?: number;
    status: string;
    deposit?: number;
    mesto?: string;
    popust?: number;
    proizvodi?: Array<Proizvod>;
    ukupno?: number;
    godina?: Date;
    klijentUid?: string;
    placeno?: boolean;
    kompanijaUid?: string;
}