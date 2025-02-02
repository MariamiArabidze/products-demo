import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment.local';
import { Product } from '../models/Product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = `${environment.apiUrl}/product`;

    constructor(private http: HttpClient) { }
    private productsSource = new BehaviorSubject<Product[]>([]);
    currentProducts = this.productsSource.asObservable();


    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    getProductsByCategory(categoryId: number): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/category/${categoryId}`);
    }

    getProductsByCountry(countryId: number): Observable<Product[]> {
        return this.http.get<Product[]>(`${this.apiUrl}/country/${countryId}`);
    }

    createProduct(product: Partial<Product>): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product);
    }

    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    updateProducts(products: Product[]) {
        this.productsSource.next(products);
    }
    getProductsByCategoryMock(categoryId: number): Observable<Product[]> {
        const mockProducts: { [key: number]: Product[] } = {
            21: [ // Winston products
                {
                    id: 111,
                    code: "WB001",
                    name: "Winston Blue",
                    price: 7.8,
                    categoryId: 21,
                    countryId: 7,
                    category: { name: "Winston", parentId: 4, id: 21 },
                    country: { name: "Georgia", id: 7 }
                },
                {
                    id: 112,
                    code: "WR001",
                    name: "Winston Red",
                    price: 7.8,
                    categoryId: 21,
                    countryId: 7,
                    category: { name: "Winston", parentId: 4, id: 21 },
                    country: { name: "Georgia", id: 7 }
                }
            ],
            22: [ // Marlboro products
                {
                    id: 113,
                    code: "MB001",
                    name: "Marlboro Red",
                    price: 8.5,
                    categoryId: 22,
                    countryId: 7,
                    category: { name: "Marlboro", parentId: 4, id: 22 },
                    country: { name: "Georgia", id: 7 }
                }
            ]
        };

        return of(mockProducts[categoryId] || []);
    }
}

