const Priorities = {
    "Express, All": 1 << 0,
    "Express, Some": 1 << 1,
    "Limited, All": 1 << 2,
    "Limited, Some": 1 << 3,
    "Local, All": 1 << 4,
    "Local, Some": 1 << 5,
}

export default class Priority {

    private _priority: number = 0;
    toJSON = () => this._priority;

    //

    public static from(priority: number) {
        const p = new Priority();
        p._priority = priority;
        return p;
    }

    //

    public rating() {

        let rating = 0;

        if(this.check("Express, All")) rating += 1;
        else if(this.check("Express, Some")) rating += 0.5;

        if(this.check("Limited, All")) rating += 1;
        else if(this.check("Limited, Some")) rating += 0.5;

        if(this.check("Local, All")) rating += 1;
        else if(this.check("Local, Some")) rating += 0.5;

        return rating;

    }

    //

    public set(express: 'all' | 'some' | 'none', limited: 'all' | 'some' | 'none', local: 'all' | 'some' | 'none') {
        if (express !== 'none') this.express(express);
        if (limited !== 'none') this.limited(limited);
        if (local !== 'none') this.local(local);
        return this;
    }

    public all(): Priority {
        this._priority = Priorities["Express, All"] | Priorities["Limited, All"] | Priorities["Local, All"];
        return this;
    }

    public express(type: 'some' | 'all') {
        switch (type) {
            case 'some':
                this._priority |= Priorities["Express, Some"];
                break;
            case 'all':
                this._priority |= Priorities["Express, All"];
                break;
        }

        return this;
    }

    public limited(type: 'some' | 'all') {
        switch (type) {
            case 'some':
                this._priority |= Priorities["Limited, Some"];
                break;
            case 'all':
                this._priority |= Priorities["Limited, All"];
                break;
        }

        return this;
    }

    public local(type: 'some' | 'all') {
        switch (type) {
            case 'some':
                this._priority |= Priorities["Local, Some"];
                break;
            case 'all':
                this._priority |= Priorities["Local, All"];
                break;
        }

        return this;
    }

    //

    public check(priority: keyof typeof Priorities): boolean {
        return (this._priority & Priorities[priority]) === Priorities[priority];
    }

}