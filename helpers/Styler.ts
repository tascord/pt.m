export default function tw(tailwind: string) {
    let obj: {[key: string]: true} = {};
    const split = tailwind.split(/( +|\n)/gi);

    for (let i = 0; i < split.length; i++) {
        const item = split[i].trim();
        if (item.length > 0) {
            obj[item] = true;
        }
    }

    return obj;
}