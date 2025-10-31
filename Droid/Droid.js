"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Droid = void 0;
var Droid;
(function (Droid) {
    let number;
    number = getRandonNumber();
    console.log(number);
    function getCommand() {
        number = getRandonNumber();
        const command = {
            module: "Chassis",
            method: "move",
            data: "forward",
        };
        switch (number) {
            case 0:
                command.data = "forward";
                break;
            case 1:
                command.data = "back";
                break;
            case 2:
                command.data = "right";
                break;
            case 3:
                command.data = "left";
                break;
            case 4:
                command.data = "stop";
                break;
        }
        console.log(command);
        console.log(number);
        return command;
    }
    Droid.getCommand = getCommand;
    function getRandonNumber() {
        const generateRandomNumber = Math.floor(Math.random() * 5);
        return generateRandomNumber;
    }
    Droid.getRandonNumber = getRandonNumber;
})(Droid || (exports.Droid = Droid = {}));
