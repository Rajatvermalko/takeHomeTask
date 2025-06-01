import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Photo, AppState } from '../types';

type Action =
    | { type: 'FETCH_PHOTOS_START' }
    | { type: 'FETCH_PHOTOS_SUCCESS'; payload: Photo[] }
    | { type: 'FETCH_PHOTOS_ERROR' }
    | { type: 'ADD_TO_FAVORITES'; payload: Photo }
    | { type: 'REMOVE_FROM_FAVORITES'; payload: number }
    | { type: 'INCREMENT_PAGE' }
    | { type: 'SET_HAS_MORE'; payload: boolean };

const initialState: AppState = {
    photos: [],
    favorites: [],
    loading: false,
    page: 1,
    hasMore: true,
};

const appReducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case 'FETCH_PHOTOS_START':
            return {
                ...state,
                loading: true,
            };
        case 'FETCH_PHOTOS_SUCCESS':
            const newPhotos = action.payload.filter(
                newPhoto => !state.photos.some(existingPhoto => existingPhoto.id === newPhoto.id)
            );

            return {
                ...state,
                loading: false,
                photos: [...state.photos, ...newPhotos],
            };
        case 'FETCH_PHOTOS_ERROR':
            return {
                ...state,
                loading: false,
            };
        case 'ADD_TO_FAVORITES':
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
            };
        case 'REMOVE_FROM_FAVORITES':
            return {
                ...state,
                favorites: state.favorites.filter(photo => photo.id !== action.payload),
            };
        case 'INCREMENT_PAGE':
            return {
                ...state,
                page: state.page + 1,
            };
        case 'SET_HAS_MORE':
            return {
                ...state,
                hasMore: action.payload,
            };
        default:
            return state;
    }
};

interface AppContextProps {
    state: AppState;
    dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};