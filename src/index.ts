import * as dotenv from "dotenv";
import { getConfig } from "./Config/Config";
import { ToborService } from "./Services/toborService";
import { Table } from "./Common/Table";
import { TOBOR_ERROR_PREFIX } from "./UX/messages";

dotenv.config();

const handleError = (error: unknown) => {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    console.log(TOBOR_ERROR_PREFIX);
    console.log(message);
};

export const run = async () => {
    try {
        const config = getConfig();
        const table = new Table(config.table);
        const service = new ToborService(config.tobor, table);
        await service.readInput();
    } catch (error) {
        handleError(error);
        process.exit();
    }
};

run();
