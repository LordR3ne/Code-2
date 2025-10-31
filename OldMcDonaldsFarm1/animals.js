"use strict";
var FarmingSimulator2055;
(function (FarmingSimulator2055) {
    let SPECIES;
    (function (SPECIES) {
        SPECIES[SPECIES["COW"] = 0] = "COW";
        SPECIES[SPECIES["CHICKEN"] = 1] = "CHICKEN";
        SPECIES[SPECIES["DOG"] = 2] = "DOG";
    })(SPECIES || (SPECIES = {}));
    let SUPPLY;
    (function (SUPPLY) {
        SUPPLY[SUPPLY["GRASS"] = 0] = "GRASS";
        SUPPLY[SUPPLY["SEEDS"] = 1] = "SEEDS";
        SUPPLY[SUPPLY["MEAT"] = 2] = "MEAT";
    })(SUPPLY || (SUPPLY = {}));
    class Animals {
        name;
        sound;
        food;
        constructor() {
            this.name = SPECIES.CHICKEN;
            this.sound = "KIKIRIKI";
            this.food = SUPPLY.SEEDS;
        }
    }
    FarmingSimulator2055.Animals = Animals;
    const chicken = new Animals;
    chicken.name = SPECIES.CHICKEN;
})(FarmingSimulator2055 || (FarmingSimulator2055 = {}));
