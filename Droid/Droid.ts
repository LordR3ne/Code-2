export namespace Droid {
    
    interface Command {
        module: string,
        method: string,
        data: string,
    }
    let number: number;
    number = getRandonNumber();
    console.log(number)
    export function getCommand(): Command {
        number = getRandonNumber();
        const command: Command =
         {

            module: "Chassis",
            method: "move",
            data: "forward",
        }
        switch (number) {
            case 0: command.data="forward"
                break;
            case 1: command.data="back"
                break;
            case 2: command.data="right"
                break;
            case 3: command.data="left"
                break;
            case 4: command.data="stop"
                break;

        }
        console.log(command);
        console.log(number);
        return command
    }
    export function getRandonNumber(): number {
        const generateRandomNumber: number = Math.random() * 5;
        const randomNumber: number = Math.floor(generateRandomNumber);
        return randomNumber
    }

}