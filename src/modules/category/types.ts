
export type Category = {
    _id: number
    code: string
    name: string
    description: string
    total: number;
}

export interface CategoryResponse {
    data: Category[];
    total: number;
    currentPage: number;
}