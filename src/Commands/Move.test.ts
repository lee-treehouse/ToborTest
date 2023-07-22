import { CompassDirection } from "../Types/CompassDirection";
import { Position } from "../Types/Position";
import { getCommand } from "./CommandFactory";
import { MoveCommand } from "./Move";

describe("Execute", () => {
    it("Should return a Position with direction facing that has not changed from the input position", () => {
        const moveCommand = getCommand({ command: "MOVE", args: [] });
        const currentPosition: Position = { coordinates: { x: 3, y: 5 }, directionFacing: CompassDirection.NORTH };
        const result = moveCommand.execute(currentPosition);
        expect(result).toEqual(expect.objectContaining({ directionFacing: currentPosition.directionFacing }));
    });

    const coordinates = { x: 3, y: 5 };
    const validCases = [
        {
            currentPosition: { coordinates, directionFacing: CompassDirection.NORTH },
            expectedCoordinates: { coordinates: { x: 3, y: 6 } },
        },
        {
            currentPosition: { coordinates, directionFacing: CompassDirection.EAST },
            expectedCoordinates: { coordinates: { x: 4, y: 5 } },
        },
        {
            currentPosition: { coordinates, directionFacing: CompassDirection.SOUTH },
            expectedCoordinates: { coordinates: { x: 3, y: 4 } },
        },
        {
            currentPosition: { coordinates, directionFacing: CompassDirection.WEST },
            expectedCoordinates: { coordinates: { x: 2, y: 5 } },
        },
    ];

    test.each(validCases)(
        "Should return a Position with coordinates moved one unit in direction $currentPosition.directionFacing ",
        ({ currentPosition, expectedCoordinates }) => {
            const moveCommand = new MoveCommand([]);
            const result = moveCommand.execute(currentPosition);
            expect(result).toEqual(expect.objectContaining({ coordinates: expectedCoordinates.coordinates }));
        }
    );
});

describe("Properties", () => {
    it("Should be able to be ignored eg if item is not placed on a table", () => {
        const moveCommand = getCommand({ command: "MOVE", args: [] });
        expect(moveCommand.canBeIgnored).toBe(true);
    });

    it("Should have static command property 'MOVE' so command can be invoked", () => {
        expect(MoveCommand.command).toBe("MOVE");
    });
});

describe("Constructor", () => {
    it("Should throw specific error message when constructed with arguments", () => {
        const constructor = () => getCommand({ command: "MOVE", args: ["ARG"] });
        expect(constructor).toThrow(
            "ARG could not be parsed as arguments to MOVE command. No arguments should be supplied."
        );
    });
});
