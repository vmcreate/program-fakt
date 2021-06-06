import { Klijent } from "./Klijent";
import { Proizvod } from "./Proizvod";

export interface Pracun {
    brojracuna?: string;
    ime?: string;
    pocetniDatum?: number;
    zavrsniDatum?: number;
    status: string;
    mesto?: string;
    popust?: number;
    proizvodi?: Array<Proizvod>;
    ukupno?: number;
    godina?: Date;
    klijentUid?: string;
    klijent?: Klijent
}