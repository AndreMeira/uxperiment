declare type GSequence = Generator<number, void, null>;

declare type Subscriber<T> = (val:T) => void;

declare type Unsubscribe = () => void;

declare type Observable<T> = {
    subscribe:(fn:Subscriber<T>) => Unsubscribe,
};

declare type ChannelEvent<T> = { name:string, id:number, payload:T };

declare type Channel = {
    publish: <T>(name:string, payload: T) => number,
    subscribe: (fn:(payload: ChannelEvent<any>) => void) => Unsubscribe
};

export {
    Subscriber, Unsubscribe, Observable, GSequence, Channel, ChannelEvent,
};
