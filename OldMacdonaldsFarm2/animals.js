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
            console.log("Purr...");
        }
    }
    OldMcDonald.Cow = Cow;
    class Horse extends OldMcDonald.Animal {
        doSpecialAction() {
            console.log("Purr...");
        }
    }
    OldMcDonald.Horse = Horse;
    class Pig extends OldMcDonald.Animal {
        doSpecialAction() {
            console.log("Purr...");
        }
    }
    OldMcDonald.Pig = Pig;
})(OldMcDonald || (OldMcDonald = {}));
