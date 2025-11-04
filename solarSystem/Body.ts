namespace Solar {
    export class Body extends Entity {
        size: number;
        color: string;
        rotation: number;
        orbit: number;
        distance: number;
        bodies: Body[];
        public isSun: boolean = false;
        public static bodyCount: number = 0;
        public ID: number = 0;



        constructor(_size: number, _color: string, _rotation: number, _orbit: number, _distance: number) {
            super()
            this.ID = Body.bodyCount;
            Body.bodyCount++
            this.size = _size;
            this.color = _color;
            this.rotation = _rotation;
            this.orbit = _orbit;
            this.distance = _distance;
            this.bodies = []

        }

        createChild(_size: number, _color: string, _rotation: number, _orbit: number, _distance: number): number {
            const body: Body = new Body(_size, _color, _rotation, _orbit, _distance)
            this.bodies.push(body)
            return (body.ID)
        }

        getChild(_ID: number): Body | null{
            for (let body of this.bodies){
                if (_ID = body.ID){
                    console.log(body);
                    
                    return body
                }

            }
            return null
        }
        public draw(): void {
            const Sun: Path2D = new Path2D();
            crc2.beginPath();
            crc2.save();
            crc2.translate(this.orbit, 0) //for sun this.orbit = 0
            crc2.arc(0, 0, this.size, 0, 2 * Math.PI)
            crc2.fillStyle = this.color
            crc2.fill()
            crc2.restore();

            for (let i: number = 0; i < this.bodies.length; i++) {
                crc2.save()
                crc2.translate(this.bodies[i].distance, 0)
                this.bodies[i].draw()
                // crc2.restore()
            }
            console.log(this.size);
            
        }


        // getRandomChild(): Body {

        // }
    }
}