namespace Solar {
    window.addEventListener("load", handleLoad);
    export let crc2: CanvasRenderingContext2D;
    let selectedSpaceship: SpaceShip | null = null;
    let selectedBody: Body | null = null;
    let uiPlanet: HTMLSpanElement;
    let uiSpaceship: HTMLSpanElement;
    let showBodyUi: boolean;
    let showSpaceshipUi: boolean;
    let sun: Body = new Body(40, "yellow", 0, 0, 0)
    let earth: number = sun.createChild(10, "blue", 0, 0, 100)

    function handleLoad(_event: Event): void {
        console.log("Asteroids starting");
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        crc2.canvas.width = window.innerWidth
        crc2.canvas.height = window.innerHeight
        crc2.fillStyle = "black";
        crc2.strokeStyle = "white";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        // draw();
        // createPlanets();
        // createSpaceShip();



        canvas.addEventListener("mousedown", handleMouse);
        window.setInterval(update, 60);
    }
    function update() {
        // crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.save()
        crc2.translate(crc2.canvas.width / 2, crc2.canvas.height / 2)
        sun.draw()
        const earthReference: Body | null =  sun.getChild(earth)
        if (earthReference != null) {
            earthReference.draw()
        }
        crc2.restore()
        crc2.restore()
        console.log("Moveable length: ", Entity.length);
    }
}


function handleMouse(_event: MouseEvent): void {
    console.log("handleMouse");

    let showSpaceshipUi = false;
    let showBodyUi = false;

    // if (selectedSpaceship != null) {
    //     if (selectedPlanet != null) {
    //         selectedSpaceship.destination = selectedPlanet.position;
    //     }
    //     showSpaceshipUi = true;
    //     showBodyUi = false;
    // } else if (selectedPlanet != null) {
    //     showSpaceshipUi = false;
    //     showBodyUi = true;
    // } else {
    //     showSpaceshipUi = false;
    //     showBodyUi = false;
    // }



}

