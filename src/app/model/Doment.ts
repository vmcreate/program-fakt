import { Klijent } from "./Klijent";

export interface Domen {
    ime?: string;
    datumDodele?: number;
    klijent: Klijent;
    cena?: number;
    trosak?: number;
    id?: any;
}