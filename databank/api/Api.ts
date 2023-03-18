import { config } from 'dotenv';
import { createHmac } from 'crypto';
import { H3Event } from 'h3';
import phin from 'phin';
import { Line, Stop } from '../Stations';

class Cache {
    private max_time = 1000 * 60 * 5; // 5 minutes
    private cache = new Map<string, [number, any]>([]);

    public get<T>(key: string): [T | undefined, boolean] {

        if (!this.cache.has(key)) return [undefined, false];
        const [created, data] = this.cache.get(key)!;

        const expired = (Date.now() - created > this.max_time);
        return [data as T, expired];

    }

    public set(key: string, data: any) {
        this.cache.set(key, [Date.now(), data]);
    }
}

enum RouteType {
    Train = 0
}

type BasicResponse = {
    message?: string,
    status: {
        version: string,
        health: 0 | 1
    }
}

class Api {

    private cache = new Cache();
    private working: string[] = [];

    constructor() {
        config();
        if (!process.env.DEV_ID) throw new Error('DEV_ID not found in .env file');
        if (!process.env.KEY) throw new Error('KEY not found in .env file');
    }

    public $<T>(path: string, mapper?: (data: any) => T): Promise<T> {
        return new Promise((resolve, reject) => {

            const [data, expired] = this.cache.get<T>(path);

            if (data) resolve(data);
            if (data && !expired) return;

            const request = path + (path.includes('?') ? '&' : '?');

            if (this.working.includes(request) && data) return;
            this.working.push(request);

            const raw = request + 'devid=' + process.env.DEV_ID;
            const hashed = createHmac('sha1', process.env.KEY!).update(raw).digest('hex');
            const url = 'https://timetableapi.ptv.vic.gov.au' + raw + '&signature=' + hashed;

            phin<BasicResponse>({ url, parse: 'json' })
                .then(res => {

                    if (!res.body.status) reject('Unable to get data from PTV');
                    if (res.body.status.health == 0) return reject(res.body.message || 'PTV API is unstable right now');
                    if (res.body.message) return reject(res.body.message);

                    delete (res.body as Partial<BasicResponse>).status;
                    if (mapper) res.body = mapper(res.body) as BasicResponse;

                    this.cache.set(path, res.body);
                    this.working = this.working.filter(x => x != request);

                    if (!data) resolve(res.body as T);

                })
        });
    }

    public async wrap(event: H3Event, fn: Promise<any>) {
        try {
            return await fn;
        } catch (err) {
            return sendError(event, createError({
                statusCode: 500,
                statusMessage: String(err) || 'API Error'
            }));
        }
    }

    /* ---------------------------------- */

    public routes() {
        return this.$<{
            route_id: number,
            route_name: string,
            route_gtfs_id: string,
            status: {
                description: string,
                timestamp: string
            }
        }[]>(`/v3/routes?route_types=${RouteType.Train}`, (data) => {
            return data.routes.map((route: any) => {
                delete route.geopath;
                delete route.route_type;
                delete route.route_number;

                route.status = route.route_service_status;
                delete route.route_service_status;

                return route;
            })

        });
    }

    public async stops(route: Line) {
        const route_id = await (await this.routes()).find(x => x.route_name == route)?.route_id;
        if (!route_id) throw new Error('Route not found');
        return this.$<{
            id: string,
            name: string,
            landmark: string,
            suburb: string,
            sequence: number,

            ticket: {
                type: string,
                zone: string,
                free_fare: boolean,
                machine_on_site: boolean,
                checks_performed: boolean,
                vline_reservations: boolean,
                zones: number[],
            },

            location: {
                latitude: number,
                longitude: number
            },

            geo: []
        }[]>(`/v3/stops/route/${route_id}/route_type/${RouteType.Train}?stop_disruptions=false&include_geopath=true`, (data) => {
            return data.stops.map((stop: any) => ({

                id: stop.stop_id,
                name: stop.stop_name,
                landmark: stop.stop_landmark,
                suburb: stop.stop_suburb,
                sequence: stop.stop_sequence,

                ticket: {
                    type: stop.stop_ticket.ticket_type,
                    zone: stop.stop_ticket.ticket_zone,
                    free_fare: stop.stop_ticket.is_free_fare_zone,
                    machine_on_site: stop.stop_ticket.ticket_machine,
                    checks_performed: stop.stop_ticket.ticket_checks,
                    vline_reservations: stop.stop_ticket.vline_reservation,
                    zones: stop.stop_ticket.ticket_zones
                },

                location: {
                    latitude: stop.stop_latitude,
                    longitude: stop.stop_longitude
                },

                geopath: stop.geopath

            }))
        })
    }

}

export default new Api();