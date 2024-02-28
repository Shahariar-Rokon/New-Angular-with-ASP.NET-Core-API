import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
baseUrl:string="http://localhost:5240";
  constructor(private http:HttpClient) { }
  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'/api/Products')
  }
  addProduct(newProduct:Product):Observable<Product>{
    newProduct.id='00000000-0000-0000-0000-000000000000';
    return this.http.post<Product>(this.baseUrl+'/api/Products',newProduct)
  }
  getProductById(id:string):Observable<Product>{
    return this.http.get<Product>(this.baseUrl+'/api/Products/'+id)
  }
  updateProduct(id:string,upProduct:Product):Observable<Product>{
    return this.http.put<Product>(this.baseUrl+'/api/Products/'+id,upProduct)
  }
  deleteProduct(id:string):Observable<Product>{
    return this.http.delete<Product>(this.baseUrl+'/api/Products/'+id);
  }
}
