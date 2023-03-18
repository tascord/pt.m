import { StationCode } from "../Stations";
import Priority from "./Priority";

type Stop = {
    code: StationCode;
    priority: Priority;
}

export default class Line {

    line_name?: string;
    stops: Stop[] = [];
    verified = true;

    add(code: StationCode, priority: Priority): Line {
        this.stops.push({ code, priority });
        return this;
    }

    unsure(): Line {
        this.verified = false;
        return this;
    }

}