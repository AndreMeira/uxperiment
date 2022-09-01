import Application from './Application';
import { Provider as IProvider } from './types.d';

export default abstract class Provider implements IProvider {

    // constructor
    public constructor(protected readonly app: Application) {}

    public abstract boot(): void;

}
