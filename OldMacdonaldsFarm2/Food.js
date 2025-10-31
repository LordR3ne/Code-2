"use strict";
var OldMcDonald;
(function (OldMcDonald) {
    class Food {
        type;
        amount;
        constructor(_type, _amount) {
            this.type = _type;
            this.amount = _amount;
        }
        consumption() {
            return `${this.type}: ${this.amount}`;
        }
    }
    OldMcDonald.Food = Food;
})(OldMcDonald || (OldMcDonald = {}));
