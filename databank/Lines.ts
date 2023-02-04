import Belgrave from "./lines/belgrave";
import { resolve_code } from "./Stations";

export const Lines = [
    Belgrave
]

export const LineNames = Lines.map(l => l.line_name || resolve_code(l.stops[0].code)!.name);