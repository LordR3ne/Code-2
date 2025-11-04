namespace Solar {
    class SpaceShip extends Entity {
        public resource: string = ""
        public destination: Vector = new Vector(0, 0);
        public velocity: Vector = new Vector(0, 0);

        public setDestination(_destination: Vector): void {
            this.destination = _destination;
        }
        public move(_timesplice: number): void {
            console.log("Move SpaceShip");
            const offset: Vector = this.velocity.copy();
            offset.scale(_timesplice);
            this.position.add(offset);
        }
        public draw(): void {
            const canvas: HTMLCanvasElement = document.querySelector("canvas") as HTMLCanvasElement;
            const crc2: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;

            crc2.save();
            crc2.translate(this.position.x, this.position.y);


            crc2.beginPath();
            crc2.moveTo(0, -15);
            crc2.lineTo(-10, 10);
            crc2.lineTo(10, 10);
            crc2.closePath();

            crc2.fillStyle = "#FFFFFF";
            crc2.fill();
            crc2.strokeStyle = "#333333";
            crc2.stroke();


            crc2.beginPath();
            crc2.moveTo(-7, 10);
            crc2.lineTo(7, 10);
            crc2.lineTo(0, 20);
            crc2.closePath();

            crc2.fillStyle = "orange";
            crc2.fill();


            crc2.beginPath();
            crc2.moveTo(-4, 10);
            crc2.lineTo(4, 10);
            crc2.lineTo(0, 15);
            crc2.closePath();

            crc2.fillStyle = "yellow";
            crc2.fill();

            crc2.restore();
        }

    }
    new SpaceShip();
}
