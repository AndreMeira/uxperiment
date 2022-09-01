import {
    Provider,
    Application as App,
    Builder,
    Class,
    ProviderConstructor,
    ProviderMap,
} from './types';

/**
 * Application class
 */
export default class Application implements App {

    /**
     * The list of all registered providers
     */
    private providers: Provider[] = [];

    /**
     * The map that contains the service and how to build it
     */
    private servicesRegistry: ProviderMap<any> = new Map();

    public constructor(conf: { providers?: Array<ProviderConstructor> }) {
        const providers: Array<ProviderConstructor> = conf.providers || [];
        providers.forEach(ProviderClass => this.registerProvider(new ProviderClass(this)));
    }

    /**
     * Application bootstrap
     */
    public boot(): void {
        this.providers.forEach(e => e.boot());
    }

    public registerProvider(provider: Provider): App {
        this.providers.push(provider);
        return this;
    }

    public builder<T>(builder: Builder<T>): App {
        this.servicesRegistry.set(builder, builder);
        return this;
    }

    public register<T>(service: string | Class<T>, builder: Builder<T>): App {
        this.servicesRegistry.set(service, builder);
        return this;
    }

    public singleton<T>(service: string | Class<T>, builder: Builder<T>): App {
        const handler = Application.makeSingletonHandler(builder);
        this.servicesRegistry.set(service, handler);
        return this;
    }

    public once<T>(builder: Builder<T>): App {
        const handler = Application.makeSingletonHandler(builder);
        this.servicesRegistry.set(builder, handler);
        return this;
    }

    public use<T>(service: string | Builder<T> | Class<T>, ...args: any[]): T {
        const handler: Builder<T> = this.servicesRegistry.get(service) as Builder<T>;
        return handler(args);
    }

    private static makeSingletonHandler<T>(builder: Builder<T>): Builder<T> {
        // closure to remember the instance
        return (() => {
            let instance: T | null = null;
            return (...args: any[]) => {
                if (!instance) {
                    instance = builder(...args);
                }
                return instance;
            };
        })();
    }

}
