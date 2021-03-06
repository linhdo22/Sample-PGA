import { ActionType, createCustomAction, getType } from 'typesafe-actions';

export interface NavState {
    sidebarExpand: boolean;
}

export const setSidebarExpand = createCustomAction('nav/setSidebarExpand', (value: boolean) => ({
    value,
}));
export const toggleSidebarExpand = createCustomAction('nav/toggleSidebarExpand', () => ({}));

const actions = { setSidebarExpand, toggleSidebarExpand };

type Action = ActionType<typeof actions>;

const navDefaultState: NavState = {
    sidebarExpand: true
}

export default function navReducer(state: NavState = navDefaultState, action: Action) {
    switch (action.type) {
        case getType(setSidebarExpand):
            return { ...state, sidebarExpand: action.value };
        case getType(toggleSidebarExpand):
            return { ...state, sidebarExpand: !state.sidebarExpand };
        default:
            return state;
    }
}
