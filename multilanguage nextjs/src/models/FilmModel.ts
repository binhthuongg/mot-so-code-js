export interface FilmModel {
    name?: string;
    name_en?: string;
    url?: string;
    movie_id?: string;
    release_year?: string;
    season_landscape_poster_url?: string;
    season_last_id?: string;
    landscape_poster_url?: string;
    portrait_poster_url?: string;
    age_rate?: number;
    length?: number;
    length_int?: number;
    description?: string;
    actors?: [];
    actor_names?: string;
    directors?: [];
    director_names?: string;
    categories?: [];
    movie_similars?: [];
    watching_percent?: string;
    length_remain?: string;
    movie_url?: string;
    watching_point?: number;
    is_favorite?: boolean;
    is_trailer?: boolean;
    seasons?: [];
}

export type ListFilmModel = Array<FilmModel>;

export interface listSeasonEpisodeModel {
    movie_id?: string;
    espisode_id?: string;
    name?: string;
    name_en?: string;
    length?: string;
    portrait_poster_url?: string;
    landscape_poster_url?: string;
    season_landscape_poster_url?: string;
    season_portrait_poster_url?: string;
    screenshot_url?: string;
    release_year?: number;
    espisode_last_id?: string;
    espisode_last_name?: string;
    length_int?: number;
    watching_point?: number;
    watching_percent?: number;
    length_remain?: string;
    movie_url?: string;
    description?: string;
    asset_id?: string;
}
export interface MovieSeasonModel {
    season_id: string;
    name?: string;
    name_en?: string;
    season_portrait_poster_url?: string;
    season_landscape_poster_url?: string;
    listSeasonEpisode?: listSeasonEpisodeModel[];
}

export interface FilmGenreModel {
    created: string;
    created_by: string;
    updated: string;
    updated_by: string;
    id: string;
    name: string;
    name_en: string;
    num: number;
    is_home: boolean;
}

export interface MovieEpisodeModel {
    asset_id?: string;
    description?: string;
    espisode_id?: string;
    espisode_last_id?: string;
    espisode_last_name?: string;
    landscape_poster_url?: string;
    length?: string;
    length_int?: number;
    length_remain?: string;
    movie_id?: string;
    movie_url?: string;
    name?: string;
    name_en?: string;
    portrait_poster_url?: string;
    release_year?: number;
    screenshot_url?: string;
    season_landscape_poster_url?: string;
    season_portrait_poster_url?: string;
    watching_percent?: number;
    watching_point?: number;
}
