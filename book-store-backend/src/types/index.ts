export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    price: number;
}

export interface CreateBookRequest {
    title: string;
    author: string;
    genre: string;
    price: number;
}