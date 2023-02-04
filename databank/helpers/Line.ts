import { StationCode } from "../Stations";
import Priority from "./Priority";

type Stop = {
    code: StationCode;
    priority: Priority;
}

export default class Line {

    line_name?: string;
    stops: Stop[] = [];
    add(code: StationCode, priority: Priority): Line {
        this.stops.push({ code, priority });
        return this;
    }

}