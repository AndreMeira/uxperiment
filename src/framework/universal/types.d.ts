declare type Builder<T> = (...args: any[]) => T;
declare type Class<T> = ({ new:(...args: any[]) => T });

declare type Provider = {
    boot: () => void;
};

declare type ProviderConstructor = {
    new(app: Application): Provider;
    clone(): Provider;
};

declare type ProviderMap<T> = Map<string | Class<T> | Builder<T>, Builder<T>>;

declare type ApplicationConstructor = {
    new(conf: { providers?: Array<ProviderConstructor> }): Application;
};

declare type Application = {
    boot: () => void;
    registerProvider: (provider: Provider) => Application;

    once: <T>(builder: Builder<T>) => Application;
    builder: <T>(builder: Builder<T>) => Application;

    register: <T>(service: string | Class<T>, builder: Builder<T>) => Application;
    singleton: <T>(service: string | Class<T>, builder: Builder<T>) => voApplicationid;

    use: <T>(service:string | Builder<T> | Class<T>, ...args: any[]) => T;
};

export {
    Provider, Application, Builder, Class, ProviderConstructor, ProviderMap,
};
