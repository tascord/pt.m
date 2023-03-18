import Api from "~~/databank/api/Api"
import { Lines } from "~~/databank/Lines";
import { Line, resolve_code } from "~~/databank/Stations";
import sanitize from "~~/helpers/Clean";

export default defineEventHandler(event => {

    const { station: station_code } = event.context.params;

    const station = resolve_code(station_code);
    if (!station) return { error: "Station not found" };

    const line = Lines.find(l => l.stops.some(s => sanitize(s.code) === sanitize(station_code)));
    if (!line) return { error: "Owning line not found" };

    const processed = new Promise(async (resolve) => {
        const stops = await Api.stops(resolve_code(line.stops[0].code)!.name as Line);
        resolve(stops.find(s => sanitize(s.name).includes(sanitize(station.name))));
    });

    return Api.wrap(event, processed);

})