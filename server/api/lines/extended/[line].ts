import Api from "~~/databank/api/Api"
import { Lines } from "~~/databank/Lines";
import { resolve_code, resolve_name } from "~~/databank/Stations";

export default defineEventHandler(event => {

    const { line: line_name } = event.context.params;

    const station = resolve_name(line_name);
    if (!station) return { error: "Line not found" };

    const line = Lines.find(l => l.stops[0].code === station.code);
    if (!line) return { error: "That is a station, not a line." }

    const processed = new Promise(async (resolve) => {
        const routes = await Api.routes();
        resolve(routes.find(r => r.route_name === (line.line_name || resolve_code(line.stops[0].code)!.name))!)
    });

    return Api.wrap(event, processed);

})