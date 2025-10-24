"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Droid = void 0;
var Droid;
(function (Droid) {
    function getCommand() {
        const command = {
            module: "Chassis",
            method: "move",
            data: "left",
        };
        console.log(command);
        return command;
    }
    Droid.getCommand = getCommand;
})(Droid || (exports.Droid = Droid = {}));
