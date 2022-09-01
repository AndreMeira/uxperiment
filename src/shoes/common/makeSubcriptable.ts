import { watch } from 'vue';
import { Subscriber, Unsubscribe } from './types.d';

export default function makeSubscriptable(state: object) {
    /**
     * SUBSCRIBERS
     */
    let subscribers: Subscriber[] = [];

    const addSubscriber = (subscriber: Subscriber) => {
        subscribers.push(subscriber);
    };

    const removeSubscriber = (subscriber: Subscriber) => {
        subscribers = subscribers.filter(s => s !== subscriber);
    };

    const subscribe = (subscriber:Subscriber): Unsubscribe => {
        addSubscriber(subscriber);
        return () => removeSubscriber(subscriber);
    };

    watch(state, () => subscribers.forEach(s => s(state)));
    return subscribe;
}
