"use strict";
var OldMcDonald;
(function (OldMcDonald) {
    class Dog extends OldMcDonald.Animal {
        doSpecialAction() {
            console.log("Wuff...");
        }
    }
    OldMcDonald.Dog = Dog;
    class Cat extends OldMcDonald.Animal {
        doSpecialAction() {
            console.log("Purr...");
        }
    }
    OldMcDonald.Cat = Cat;
    class Cow extends OldMcDonald.Animal {
        doSpecialAction() {
            console.log("MUUHH...");
        }
    }
    OldMcDonald.Cow = Cow;
    class Horse extends OldMcDonald.Animal {
        doSpecialAction() {
            console.log("makes horse sounds...");
        }
    }
    OldMcDonald.Horse = Horse;
    class Pig extends OldMcDonald.Animal {
        doSpecialAction() {
            console.log("oink...");
        }
    }
    OldMcDonald.Pig = Pig;
})(OldMcDonald || (OldMcDonald = {}));
