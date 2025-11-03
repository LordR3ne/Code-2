namespace Asteroid {
    export class Asteroid extends Movable {
        public type: number;
        public size: number;

        public constructor(_size: number, _position?: Vector) {
            super(_position);

            if (_position) {
                this.position = _position;
            }
            else {
                this.position = new Vector(0, 0);
            }
            console.log("Asteroid Constructor");
            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 200);
            this.type = Math.floor(Math.random() * 4);
            this.size = _size;
        }

        public draw(): void {
            // console.log("Asteroid draw");
            crc2.lineWidth = lineWidth / (this.size);
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.scale(this.size, this.size);
            crc2.translate(-50, -50);
            crc2.stroke(asteroidPaths[this.type]);
            crc2.restore();
        }

        public isHit(_hotspot: Vector): boolean {
            const hitSize: number = 50 * this.size;
            const difference: Vector = new Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y)
            return (Math.abs(difference.x) < hitSize && Math.abs(difference.y) < hitSize);
        }
    }
}