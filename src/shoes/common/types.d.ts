export interface State {
    shoes: string[];
}

export type Subscriber = (state: object) => void;
export type Unsubscribe = () => void;
