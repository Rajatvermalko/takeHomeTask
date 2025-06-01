export interface Photo {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
}

export interface AppState {
    photos: Photo[];
    favorites: Photo[];
    loading: boolean;
    page: number;
    hasMore: boolean;
}