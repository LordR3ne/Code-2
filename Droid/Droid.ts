export namespace Droid {

    type Vektor = {
        x: number,
        y: number,
        z: number,
    }
    interface Command {
        module: string,
        method: string,
        data: string,
    }



    export function getCommand(): Command{
        const command: Command = {
            module: "Chassis",
            method: "move",
            data: "left",
        }
        console.log(command);
        return command;
    } 



}