namespace Solar {
    export class Entity {
        position: Vector;
        constructor() {
            this.position = new Vector(0, 0);

        }
        move(_timeSlice: number): void {

        }
        draw(): void {

        }
        isClicked(_mouseClicked: Vector):boolean{
            return true
        }

    }
}