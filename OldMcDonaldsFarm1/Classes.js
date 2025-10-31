"use strict";
var Klassen;
(function (Klassen) {
    class Vector {
        x;
        y;
        constructor() {
            this.x = 0;
            this.y = 0;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
    }
    const v1 = new Vector();
    v1.scale(2);
    console.log(v1);
})(Klassen || (Klassen = {}));
