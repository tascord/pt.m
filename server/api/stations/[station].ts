import { resolve_code, Station } from "~~/databank/Stations";

export default defineEventHandler(event => {

    const { station: station_code } = event.context.params;

    const station = resolve_code(station_code);
    if (!station) return { error: "Station not found" };

    return station;

})