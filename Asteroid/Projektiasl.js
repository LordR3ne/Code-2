"use strict";
var Asteroid;
(function (Asteroid) {
    class Projectile extends Asteroid.Movable {
        lifetime = 2;
        constructor(_position, _velocity) {
            super(_position);
            this.velocity = _velocity.copy();
        }
        draw() {
            Asteroid.crc2.save();
            Asteroid.crc2.translate(this.position.x, this.position.y);
            Asteroid.crc2.strokeRect(-1, -1, 1, 1);
            Asteroid.crc2.restore();
        }
        move(_timesplice) {
            super.move(_timesplice);
            this.lifetime -= _timesplice;
            if (this.lifetime <= 0) {
                this.expendable = true;
            }
        }
    }
    Asteroid.Projectile = Projectile;
})(Asteroid || (Asteroid = {}));
