"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaszaKlasa = exports.showItem = void 0;
var lib_1 = require("./lib");
(0, lib_1.add)(1, 2);
// getPersonInfo({}) // err
var showItem = function (item) { return "".concat(item.name); };
exports.showItem = showItem;
var NaszaKlasa = /** @class */ (function () {
    //   readonly #tajne = "sekret";
    function NaszaKlasa(która) {
        if (która === void 0) { która = "1A"; }
        this.która = która;
        this.dodajUcznia = function (imie) {
            console.log("Dodaje ucznia ".concat(imie));
        };
        this.która;
    }
    NaszaKlasa.szkola = "Nasza szkola";
    return NaszaKlasa;
}());
exports.NaszaKlasa = NaszaKlasa;
