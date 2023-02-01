import { Lines } from "~~/databank/Lines";
import { resolve_code, resolve_name, Stop } from "~~/databank/Stations";

export default defineEventHandler(event => {

    const { line: line_name } = event.context.params;

    const station = resolve_name(line_name);
    if (!station) return { error: "Line not found" };

    const line = Lines.find(l => l.stops[0].code === station.code);
    if (!line) return { error: "That is a station, not a line." }

    const stops: Stop[] = line.stops.map(s => ({ ...resolve_code(s.code)!, priority: s.priority.toJSON() }));

    return {
        name: stops[0].name,
        stops
    }

})