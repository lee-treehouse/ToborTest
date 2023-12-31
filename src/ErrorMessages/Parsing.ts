// Commands - general

import { FORMATTED_COMMAND_LIST } from "../UX/messages";

export const COULD_NOT_PARSE_UNRECOGNIZED_COMMAND_SUFFIX = `could not be parsed as a command. Value should be one of ${FORMATTED_COMMAND_LIST}.`;

export const COULD_NOT_PARSE_ARGUMENTS_TO_COMMAND_NONE_EXPECTED = (args: string[], command: string) =>
  `${args.join(",")} could not be parsed as arguments to ${command} command. No arguments should be supplied.`;

// Commands - place

const PLACE_THREE_ARGUMENTS_EXPECTED = `Three arguments are expected (X coordinate, Y coordinate, Direction) eg '1,2,NORTH'.`;

export const COULD_NOT_PARSE_PLACE_ARGUMENTS_EXPECTED_3 = (args: string[]) => {
  if (args.length === 0) return COULD_NOT_PARSE_PLACE_ARGUMENTS_EXPECTED_3_RECEIVED_NONE;
  return `${args.join(",")} could not be parsed as arguments to PLACE command. ${PLACE_THREE_ARGUMENTS_EXPECTED}`;
};

export const COULD_NOT_PARSE_PLACE_ARGUMENTS_EXPECTED_3_RECEIVED_NONE = `Could not parse arguments to PLACE command. ${PLACE_THREE_ARGUMENTS_EXPECTED}`;

//  Coordinates

export const COULD_NOT_PARSE_COORDINATES_NON_NUMERIC_SUFFIX =
  "could not be parsed as coordinates. Values should be numeric.";

export const COULD_NOT_PARSE_COORDINATES_BELOW_ZERO_SUFFIX =
  "could not be parsed as coordinates. Values should be zero or greater.";

// Compass Direction

export const COULD_NOT_PARSE_COMPASS_DIRECTION_SUFFIX =
  "could not be parsed as compass direction. Value should be NORTH, SOUTH, EAST or WEST.";

// TABLE_LENGTH and Width

export const TABLE_LENGTH_AND_TABLE_WIDTH_MUST_BE_NUMERIC_SUFFIX =
  "could not be parsed as table size. Values should be numeric.";

export const TABLE_LENGTH_AND_TABLE_WIDTH_BELOW_ONE_SUFFIX =
  "could not be parsed as table size. Values should be 1 or greater.";
