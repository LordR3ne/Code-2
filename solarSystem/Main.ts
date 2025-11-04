namespace Solar {
    window.addEventListener("load", handleLoad);
    export let crc2: CanvasRenderingContext2D;
    let entitys: Entity[] = [];
    let selectedSpaceship: Spaceship | null = null;
    let selectedBody: Body | null = null;
    let uiPlanet: HTMLSpanElement;
    let uiSpaceship: HTMLSpanElement;
    let showBodyUi: boolean;
    let showSpaceshipUi: boolean;

    function handleLoad(_event: Event): void {
        console.log("Asteroids starting");
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        crc2.fillStyle = "black";
        crc2.strokeStyle = "white";

        draw();
        createPlanets();
        createSpaceShip();



        canvas.addEventListener("mousedown", handleMouse);
        window.setInterval(update, 60);
    }
    function update() {


        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        for (let entity of entitys) {
            entity.move(1 / 50);
            entity.draw();
        }

        


        console.log("Moveable length: ", Entity.length);
    }
}

function handleMouse(_event: MouseEvent): void {
    console.log("handleMouse");

    let showSpaceshipUi = false;
    let showBodyUi = false;

    if (selectedSpaceship != null) {
        if (selectedPlanet != null) {
            selectedSpaceship.destination = selectedPlanet.position;
        }
        showSpaceshipUi = true;
        showBodyUi = false;
    } else if (selectedPlanet != null) {
        showSpaceshipUi = false;
        showBodyUi = true;
    } else {
        showSpaceshipUi = false;
        showBodyUi = false;
    }



}

