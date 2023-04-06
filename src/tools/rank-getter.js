import random from "./random";
import { getAvailableRankings } from "./text-data";

export default getAvailableRankings()[random(0, getAvailableRankings().length - 1)];