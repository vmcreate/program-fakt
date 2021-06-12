import { Klijent } from "./Klijent";

export interface Proizvod {
    ime: string;
    cena: number;
    napomena?: string;
    id?: string;
    kolicina?: number;
    ukupno?: number;
    troskovi?: number;
    datumDodele?: any;
    klijent?: Klijent;
}