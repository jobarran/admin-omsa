import { IObra } from '@/interfaces';
import { UiState } from './';

type UiActionType =
| { type: '[UI] - ToggleName' }
| { type: '[UI] - Update Active Obra', payload: IObra | undefined }

export const uiReducer = ( state:UiState, action: UiActionType): UiState => {

    switch (action.type) {
        case '[UI] - ToggleName':
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen
            }
        case '[UI] - Update Active Obra':
            return {
                ...state,
                activeObra: action.payload
            }

        default:
            return state;
    }
};