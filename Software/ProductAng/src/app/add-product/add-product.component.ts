import { Component } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  newProduct:Product={
    id:'',
    name:'',
    type:'',
    color:'',
    price:0
  }
  constructor(private productService:ProductsService,private router:Router){}
  addProduct(){
    this.productService.addProduct(this.newProduct).subscribe({
      next:(product)=>{
        this.router.navigate(['Products'])
      },
      error:(response)=>{
        console.log(response);
      }
    })
  }
}
