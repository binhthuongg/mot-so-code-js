import { FilmModel } from './FilmModel';

export interface PlayerType {
    movie_url?: string;
    timeStartPlaying?: number;
    isDrmVideo?: boolean;
    filmDetail?: FilmModel;
}
