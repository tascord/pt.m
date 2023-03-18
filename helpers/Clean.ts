export default function sanitize(name: string) {
    return name.replace(/ /g, "_").toLowerCase();
}