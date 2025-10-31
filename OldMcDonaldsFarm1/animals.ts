namespace FarmingSimulator2055 {
    enum SPECIES {
        COW,
        CHICKEN,
        DOG,
    }
    enum SUPPLY {
        GRASS,
        SEEDS,
        MEAT,
    }
    export class Animals {

        public name: SPECIES;
        public sound: string;
        public food: SUPPLY;

        constructor() {
            this.name = SPECIES.CHICKEN;
            this.sound = "KIKIRIKI";
            this.food = SUPPLY.SEEDS;  
        }

    }

    const chicken: Animals = new Animals;

    chicken.name = SPECIES.CHICKEN;
}