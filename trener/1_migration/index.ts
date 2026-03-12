import { add, getPersonInfo } from "./lib";

add(1, 2);

// getPersonInfo({}) // err

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
