import {
    onUnmounted, reactive, Ref, ref, watch,
} from 'vue';

import {
    Channel, ChannelEvent, GSequence, Observable, Subscriber, Unsubscribe,
} from '@/composition/type.d';

export function useInitial(state:Record<string, any>, initial:Record<string, any>): void {
    Object.assign(state, initial);
}

export function* useSequence(mod: number = 10000000): GSequence {
    let i: number = 0;
    while (true) {
        i = (i + 1) % mod;
        yield i;
    }
}

export default function useProp<T>(valCallback:() => T): Ref<T> {
    const refVal:Ref<T> = ref<T>(valCallback()) as Ref<T>;
    watch(valCallback, (v) => { refVal.value = v; });
    return refVal;
}

export function useObservableProp<T>(valCallback:() => T): Observable<T> {
    let val:T = valCallback();
    let effects:Array<(val:T) => void> = [];

    const trigger = () => {
        effects.forEach((e) => e(val));
    };

    const subscribe = (fn:Subscriber<T>): Unsubscribe => {
        fn(val);
        effects.push(fn);

        const unsubscribe: Unsubscribe = () => {
            effects = effects.filter((e) => e !== fn);
        };
        onUnmounted(unsubscribe);
        return unsubscribe;
    };

    watch(valCallback, (newVal:T) => {
        val = newVal;
        trigger();
    });
    return { subscribe };
}

export function useStateAsOutput<T extends Record<string, unknown>>(initial: T) {
    const state = reactive({ tick: 0, state: initial });

    const getState = () => state.state;

    const update = () => {
        state.tick = (state.tick + 1) % 2;
    };

    const write = (patch: Partial<T>): void => {
        state.tick = (state.tick + 1) % 2;
        Object.assign(state.state, patch);
    };

    return {
        write,
        update,
        get state() {
            return getState();
        },
    };
}

export function useStateUpdate<T extends { [x: string]: any; }>(
    controller:{ subscribe: (name:string, payload:any) => Unsubscribe },
    events:string[],
    update:() => { [x: string]: any; },
): T {
    const state = reactive(update());
    events.forEach(name => controller.subscribe(name, () => Object.assign(state, update())));
    return state as T;
}

export function useMapEventsToState<T extends { [x: string]: any; }>(
    controller:{ subscribe: (name:string, payload:any) => Unsubscribe },
    map:Record<string, string>,
): T {
    const state:Record<string, any> = {};
    const eventKeys: string[] = Object.keys(map);
    const stateKeys: string[] = Object.values(map);

    stateKeys.forEach((key) => {
        state[key] = null;
    });

    const reactiveState = reactive(state);

    eventKeys.forEach((key) => {
        const stateKey: string = map[key] as unknown as string;
        controller.subscribe(key, (payload:any) => {
            reactiveState[stateKey] = payload;
        });
    });
    return reactiveState as T;
}

export function useChannel(): Channel {
    const id: Ref<number> = ref(0);
    const sequence: GSequence = useSequence();
    let listeners: Array<(payload: ChannelEvent<any>) => void> = [];
    const events: Map<number, ChannelEvent<any>> = new Map();

    const publish = <P>(name: string, payload: P) => {
        id.value = sequence.next().value as number;
        events.set(id.value, { id: id.value, name, payload });
        return id.value;
    };

    const subscribe = (fn:(payload: ChannelEvent<any>) => void): Unsubscribe => {
        listeners.push(fn);
        const unsubscribe: Unsubscribe = () => {
            listeners = listeners.filter((e) => e !== fn);
        };

        onUnmounted(unsubscribe);
        return unsubscribe;
    };

    const read = (eventId:number): void => {
        const event = events.get(eventId) as ChannelEvent<any>;
        listeners.forEach((handler) => {
            handler(event);
        });
        events.delete(eventId);
    };

    watch(id, read);
    return { publish, subscribe };
}
