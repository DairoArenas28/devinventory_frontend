
export type Product = {
    _id: number
    code: string;
    name: string;
    description: string;
    category_id: {
        _id: number;
        name: string;
    };
    brand: string;
    price: number;
    stock: number;
    created_at: Date;
    updated_at: Date;
    total: number;
} 

export interface ProductResponse {
    data: Product[];
    total: number;
    currentPage: number;
}

export type RegisterForm = Pick<Product, 'code' | 'name' | 'description' | 'category_id' | 'brand' | 'price' | 'stock' >

export type RegisterFormProduct = Pick<Product, 'code' | 'name' | 'description' | 'category_id' | 'brand' | 'price' | 'stock' >