namespace Asteroid {
    export class Projectile extends Movable {
        public lifetime: number = 2;

        public constructor(_position: Vector, _velocity: Vector) {
            super(_position);

            this.velocity = _velocity.copy();
        }

        public draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            crc2.strokeRect(-1, -1, 1, 1);
            crc2.restore();
        }

        public move(_timesplice: number): void {
            super.move(_timesplice);
            this.lifetime -= _timesplice;
            if (this.lifetime <= 0) {
                this.expendable = true;    
            }
        }

        // public isHit(_hotspot: Vector): boolean {
        //     const hitSize: number = 50 * this.size;
        //     const difference: Vector = new Vector(_hotspot.x - this.position.x, _hotspot.y - this.position.y)
        //     return (Math.abs(difference.x) < hitSize && Math.abs(difference.y) < hitSize);
        // }
    }
}