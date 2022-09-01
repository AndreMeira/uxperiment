import App from '@/framework/universal/Application';
import {
    Application, Builder, Class, ProviderConstructor,
} from '@/framework/universal/types.d';

// let application: Application;

// export function createApp(conf: { providers?: Array<ProviderConstructor> }): Application {
//     if (application) {
//         throw new Error('Application has already been created');
//     }
//     application = new App(conf);
//     return application;
// }

// export function app(): Application {
//     if (!application) {
//         throw new Error('Application has not already been created');
//     }
//     return application;
// }

// export function use<T>(service:string | Builder<T> | Class<T>, ...args: any[]): T {
//     return app().use(service, ...args);
// }

export default ((): { createApp: Function, app: Function, use: Function } => {
    let application: Application;

    const app = (): Application => application;

    const use = <T>(service:string | Builder<T> | Class<T>, ...args: any[]): T => (
        app().use(service, ...args)
    );

    const createApp = (conf:{ providers?: Array<ProviderConstructor> }): Application => {
        application = application || new App(conf);
        return application;
    };

    return { createApp, app, use };
})();
