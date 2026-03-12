import { add, getPersonInfo, placki } from "./lib/index.js";

add(1, 2); // from index.d.ts declarations

// getPersonInfo({}) // err

const x = 1 ** 2;

export const showItem = (item: { name: string }) => `${item.name}`;

export class NaszaKlasa {
  static readonly szkola = "Nasza szkola";

  //   readonly #tajne = "sekret";

  constructor(readonly która = "1A") {
    this.która;
  }

  dodajUcznia = (imie: string) => {
    console.log(`Dodaje ucznia ${imie}`);
  };
}

throw new Error('Ups...')

window.document.body;
[].find(() => false)
new Set().intersection(new Set())