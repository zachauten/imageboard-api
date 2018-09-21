import {Board} from './board';

export interface Thread {
    id: number;
    title: string;
    board: Board;
}