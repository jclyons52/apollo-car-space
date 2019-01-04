import { Container } from "./Container";

export type Context = Container;

export interface User {
    id: number;
    name: string;
    userName: string;
    email: string;
    password: string;
}
export interface CarSpace {
    id: number;
    longitude: string;
    latitude: string;
    address: string;
}
export interface Booking {
    id: number;
    start: any;
    end: any;
}
