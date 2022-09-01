import type {
    Channel, ChannelEvent, Observable, Unsubscribe,
} from '@/composition/type';

export default class TestController {

    EVENT_GENERATE_QUOTE = 'generate-quote';

    EVENT_QUOTE_GENERATED = 'quoted-generated';

    REQUEST_EVENTS = [
        this.EVENT_QUOTE_GENERATED,
    ];

    RESPONSE_EVENTS = [
        this.EVENT_QUOTE_GENERATED,
    ];

    private msg:string = '';

    private squote: string = 'test';

    private listeners:Map<string, (payload:any) => void> = new Map();

    public constructor(msg:Observable<string>, private channel: Channel) {
        msg.subscribe((val:string) => {
            this.msg = val;
        });

        this.channel.subscribe((event:ChannelEvent<any>) => {
            this.handle(event);
        });
    }

    public get message():string {
        return this.msg;
    }

    public get quote():string {
        return this.squote;
    }

    public publish<T>(name:string, payload:T): void {
        this.channel.publish(name, payload);
    }

    public subscribe<T>(name:string, fn:(payload:T) => void): Unsubscribe {
        this.listeners.set(name, fn);
        return () => {
            this.listeners.delete(name);
        };
    }

    private handle(event:ChannelEvent<any>) {
        if (event.name === 'generate-quote') {
            this.squote = `Hello, you ${Math.random()}`;
            this.publish(this.EVENT_QUOTE_GENERATED, this.quote);
        }

        if (this.listeners.has(event.name)) {
            const listener = this.listeners.get(event.name) as (p:any) => void;
            listener(event.payload);
        }
    }

}
