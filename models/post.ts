import {Thread} from './thread';

export interface Post {
    id: number;
    comment: string;
    thread: Thread;
}