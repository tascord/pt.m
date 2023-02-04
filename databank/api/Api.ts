import { config } from 'dotenv';
import { createHmac } from 'crypto';
import { H3Event } from 'h3';
import phin from 'phin';
import { del } from 'nuxt/dist/app/compat/capi';

class Cache {
    private max_time = 1000 * 60 * 5; // 5 minutes
    private cache = new Map<string, [number, any]>([]);

    public get<T>(key: string): T | undefined {

        if (!this.cache.has(key)) return undefined;
        const [created, data] = this.cache.get(key)!;

        if (Date.now() - created > this.max_time) {
            this.cache.delete(key);
            return undefined;
        }

        return data as T;

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

    constructor() {
        config();
        if (!process.env.DEV_ID) throw new Error('DEV_ID not found in .env file');
        if (!process.env.KEY) throw new Error('KEY not found in .env file');
    }

    public $<T>(path: string, mapper?: (data: any) => T): Promise<T> {
        return new Promise((resolve, reject) => {

            const cached = this.cache.get<T>(path);
            if (cached) return resolve(cached);

            const request = path + (path.includes('?') ? '&' : '?');
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
                    resolve(res.body as T);

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
            routes: Array<{
                route_id: number,
                route_name: string,
                route_gtfs_id: string,
                status: {
                    description: string,
                    timestamp: string
                }
            }>
        }>(`/v3/routes?route_types=${RouteType.Train}`, (data) => {
            data.routes = data.routes.map((route: any) => {
                delete route.geopath;
                delete route.route_type;
                delete route.route_number;

                route.status = route.route_service_status;
                delete route.route_service_status;

                return route;
            })
            return data;
        });
    }

}

export default new Api();