import { CompassDirection } from "../../Common/CompassDirection";
import { Position } from "../../Common/Position";
import { Table } from "../../Common/Table";
import { getDefaultTestConfig } from "../TestFiles/Config/DefaultTestConfig";
import { ToborService } from "../../Services/ToborService";
import { getLogger } from "../../Output/LoggerFactory";
import { LoggerType } from "../../Output/LoggerType";

const config = getDefaultTestConfig();
const table = new Table(config.table);
const logger = getLogger(LoggerType.SILENT);
let service: ToborService;

describe("onReadInput", () => {
  beforeEach(() => {
    service = new ToborService(config.tobor, table, logger);
  });

  it("Should not have position change, or log from commands, that can be ignored when robot is not on table", async () => {
    const loggerSpy = jest.spyOn(logger, "log");

    await service.onReadInput("MOVE");
    expect(service.robotPosition).toBe("OFF");

    await service.onReadInput("LEFT");
    expect(service.robotPosition).toBe("OFF");

    await service.onReadInput("RIGHT");
    expect(service.robotPosition).toBe("OFF");

    await service.onReadInput("REPORT");
    expect(service.robotPosition).toBe("OFF");

    expect(loggerSpy).not.toHaveBeenCalled();
  });

  it("Should have position change, or log from commands, that can be ignored when robot is on table", async () => {
    const loggerSpy = jest.spyOn(logger, "log");

    await service.onReadInput("PLACE 0,0,NORTH");

    await service.onReadInput("MOVE");
    expect(service.robotPosition).toEqual({ coordinates: { x: 0, y: 1 }, directionFacing: CompassDirection.NORTH });
    await service.onReadInput("RIGHT");
    expect(service.robotPosition).toEqual({ coordinates: { x: 0, y: 1 }, directionFacing: CompassDirection.EAST });
    await service.onReadInput("LEFT");
    expect(service.robotPosition).toEqual({ coordinates: { x: 0, y: 1 }, directionFacing: CompassDirection.NORTH });

    await service.onReadInput("REPORT");

    expect(loggerSpy).toHaveBeenCalledWith(`0,1,NORTH`);
  });

  it("Should have position change from command that can't be ignored when robot is not on table", async () => {
    await service.onReadInput("PLACE 3,4,SOUTH");
    const expected: Position = { coordinates: { x: 3, y: 4 }, directionFacing: CompassDirection.SOUTH };
    expect(service.robotPosition).toEqual(expected);
  });

  it("Shouldn't have position changed if position is out of bounds of table", async () => {
    await service.onReadInput("PLACE 3,5,SOUTH");
    expect(service.robotPosition).toBe("OFF");
  });
});
