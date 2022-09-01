import { computed, reactive } from 'vue';
import makeSubscriptable from '../common/makeSubcriptable';
import { State } from '../common/types.d';

export default function useShoesStore() {

    /**
     * The state of the store
     */
    const state = reactive<State>({
        shoes: [],
    });

    /**
     * GETTERS
     */
    const getters = {

        first: computed(() => state.shoes[0] || null),

        last: computed(() => state.shoes.slice(-1).pop() || null),

        brand: (brand:string): string[] => state.shoes.filter(
            (e:string) => e.startsWith(brand),
        ),

        search: (expression: string) => state.shoes.filter(
            (e:string) => e.includes(expression),
        ),
    };

    /**
     * ACTIONS
     */
    const actions = {

        add: (shoesModel:string) => state.shoes.push(shoesModel),

        remove: (shoesModel:string) => {
            state.shoes = state.shoes.filter(e => e !== shoesModel);
        },

    };

    /**
     * LISTENERS
     */
    const subscribe = makeSubscriptable(state);

    return {
        state, getters, actions, subscribe,
    };

}
