export interface Pilot {
  id?: number;
  imie: string;
  nazwisko: string;
  numerLicencji: string;
  dataUrodzenia: string;
  narodowosc: string;
}

export interface Lotnisko {
  id?: number;
  kodIcao: string;
  nazwa: string;
  miasto: string;
  kraj: string;
}

export interface TypStatkuPowietrznego {
  id?: number;
  producent: string;
  model: string;
  kategoria: string;
}

export interface StatekPowietrzny {
  id?: number;
  rejestracja: string;
  typStatkuPowietrznegoId?: number;
  typStatkuPowietrznegoModel?: string;
  typStatkuPowietrznegoProducent?: string;
}

export interface RodzajZadania {
  id?: number;
  nazwa: string;
  opis: string;
}

export interface Uprawnienie {
  id?: number;
  nazwa: string;
  opis: string;
}

export interface PilotUprawnienie {
  id?: number;
  dataWydania: string;
  dataWaznosci: string;
  pilotId: number;
  pilotImie?: string;
  pilotNazwisko?: string;
  uprawnienieId: number;
  uprawnienieNazwa?: string;
  wygasajace?: boolean;
}

export type KategoriaOperacji = 'VFR' | 'IFR';
export type PoraOperacji = 'DAY' | 'NIGHT';
export type TypLotu = 'REAL' | 'SIMULATOR';

export interface Lot {
  id?: number;
  dataLotu: string;
  czasBlock?: number;
  czasAirborne?: number;
  czasPIC?: number;
  czasSIC?: number;
  kategoriaOperacji?: KategoriaOperacji;
  poraOperacji?: PoraOperacji;
  typLotu?: TypLotu;
  numerLotu?: string;
  uwagi?: string;
  pilotId?: number;
  pilotImie?: string;
  pilotNazwisko?: string;
  statekPowietrznyId?: number;
  statekPowietrznyRejestracja?: string;
  lotniskoStartId?: number;
  lotniskoStartKodIcao?: string;
  lotniskoLadowanieId?: number;
  lotniskoLadowanieKodIcao?: string;
  rodzajZadaniaId?: number;
  rodzajZadaniaNazwa?: string;
}

export interface NalotSumaryczny {
  pilotId: number;
  pilotImie: string;
  pilotNazwisko: string;
  sumaBlock: number;
  sumaAirborne: number;
  sumaPIC: number;
  sumaSIC: number;
  liczbaLotow: number;
}
