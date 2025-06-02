import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Photo, AppState } from '../types';

type Action =
    | { type: 'FETCH_PHOTOS_START' }
    | { type: 'FETCH_PHOTOS_SUCCESS'; payload: Photo[] }
    | { type: 'FETCH_PHOTOS_ERROR' }
    | { type: 'ADD_TO_FAVORITES'; payload: Photo }
    | { type: 'REMOVE_FROM_FAVORITES'; payload: number }
    | { type: 'INCREMENT_PAGE' }
    | { type: 'SET_HAS_MORE'; payload: boolean }
    | { type: 'LOAD_FAVORITES'; payload: Photo[] };

const getSavedFavorites = (): Photo[] => {
    try {
        const savedFavorites = localStorage.getItem('app1_favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
        return [];
    }
};

const initialState: AppState = {
    photos: [],
    favorites: getSavedFavorites(),
    loading: false,
    page: 1,
    hasMore: true,
};

const appReducer = (state: AppState, action: Action): AppState => {
    let newState;

    switch (action.type) {
        case 'FETCH_PHOTOS_START':
            newState = {
                ...state,
                loading: true,
            };
            break;
        case 'FETCH_PHOTOS_SUCCESS':
            const newPhotos = action.payload.filter(
                newPhoto => !state.photos.some(existingPhoto => existingPhoto.id === newPhoto.id)
            );

            newState = {
                ...state,
                loading: false,
                photos: [...state.photos, ...newPhotos],
            };
            break;
        case 'FETCH_PHOTOS_ERROR':
            newState = {
                ...state,
                loading: false,
            };
            break;
        case 'ADD_TO_FAVORITES':
            if (!state.favorites.some(fav => fav.id === action.payload.id)) {
                newState = {
                    ...state,
                    favorites: [...state.favorites, action.payload],
                };
                localStorage.setItem('app1_favorites', JSON.stringify(newState.favorites));
            } else {
                newState = state;
            }
            break;
        case 'REMOVE_FROM_FAVORITES':
            newState = {
                ...state,
                favorites: state.favorites.filter(photo => photo.id !== action.payload),
            };
            localStorage.setItem('app1_favorites', JSON.stringify(newState.favorites));
            break;
        case 'INCREMENT_PAGE':
            newState = {
                ...state,
                page: state.page + 1,
            };
            break;
        case 'SET_HAS_MORE':
            newState = {
                ...state,
                hasMore: action.payload,
            };
            break;
        case 'LOAD_FAVORITES':
            newState = {
                ...state,
                favorites: action.payload,
            };
            break;
        default:
            newState = state;
    }

    return newState;
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

    useEffect(() => {
        const savedFavorites = getSavedFavorites();
        if (savedFavorites.length > 0) {
            dispatch({ type: 'LOAD_FAVORITES', payload: savedFavorites });
        }
    }, []);

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