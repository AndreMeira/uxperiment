import { useChannel } from '@/framework/universal/adapters/vue';
import Provider from '@/framework/universal/Provider';

export default class VueChannelProvider extends Provider {

    // alias for import
    public static channel = useChannel;

    // We need to make an alias for the singleton
    public static main = () => useChannel();

    public boot(): void {
        this.app.once(VueChannelProvider.main);
        this.app.builder(VueChannelProvider.channel);
    }

}
