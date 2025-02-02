import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from '../models/Category';
import { environment } from '../environments/environment.local';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = `${environment.apiUrl}/category`;

    constructor(private http: HttpClient) { }

    getCategoryTree(): Observable<Category[]> {
        return this.http.get<Category[]>(`${this.apiUrl}/category-tree`);
    }

    getCategoryTreeMock(): Observable<Category[]> {
        const mockCategories: Category[] = [
            {
                id: 1,
                name: "Products",
                parentId: null,
                children: [
                    {
                        id: 4,
                        name: "Cigarettes",
                        parentId: 1,
                        children: [
                            {
                                id: 21,
                                name: "Winston",
                                parentId: 4,
                                children: []
                            },
                            {
                                id: 22,
                                name: "Marlboro",
                                parentId: 4,
                                children: []
                            },
                            {
                                id: 23,
                                name: "Camel",
                                parentId: 4,
                                children: []
                            }
                        ]
                    },
                    {
                        id: 5,
                        name: "Beverages",
                        parentId: 1,
                        children: [
                            {
                                id: 24,
                                name: "Soft Drinks",
                                parentId: 5,
                                children: []
                            },
                            {
                                id: 25,
                                name: "Energy Drinks",
                                parentId: 5,
                                children: []
                            }
                        ]
                    }
                ]
            }
        ];

        return of(mockCategories);
    }

    getCategoryById(id: number): Observable<Category> {
        return this.http.get<Category>(`${this.apiUrl}/${id}`);
    }

    createCategory(category: Partial<Category>): Observable<Category> {
        return this.http.post<Category>(this.apiUrl, category);
    }

    updateCategory(category: Partial<Category>): Observable<Category> {
        return this.http.put<Category>(`${this.apiUrl}/${category.id}`, { name: category.name });
    }

    deleteCategory(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
