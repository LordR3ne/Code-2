namespace Asteroid {
    export class Movable {
        public position: Vector;
        public velocity: Vector;
        public expendable: boolean = false;

        public constructor(_position?: Vector) {
            if (_position) {
                this.position = _position;
            }
            else {
                this.position = new Vector(0, 0);
            }
            console.log("Asteroid Constructor");
            this.velocity = new Vector(0, 0);
        }

        public move(_timesplice: number): void {
            // console.log("Move Asteroid");
            const offset: Vector = this.velocity.copy();
            offset.scale(_timesplice);
            this.position.add(offset);

            if (this.position.x < 0) {
                this.position.x += crc2.canvas.width;
            }
            if (this.position.y < 0) {
                this.position.y += crc2.canvas.height;
            }
            if (this.position.x > crc2.canvas.width) {
                this.position.x -= crc2.canvas.width;
            }
            if (this.position.x > crc2.canvas.height) {
                this.position.y -= crc2.canvas.height;
            }
        }

        public draw(): void {
        }
    }
}