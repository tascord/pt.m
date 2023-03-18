import Alamein from "./lines/alamein";
import Belgrave from "./lines/belgrave";
import Glen_Waverley from "./lines/glen_waverley";
import Lilydale from "./lines/lilydale";
import { resolve_code } from "./Stations";

export const Lines = [
    Belgrave,
    Lilydale,
    Alamein,
    Glen_Waverley
]

export const LineNames = Lines.map(l => l.line_name || resolve_code(l.stops[0].code)!.name);