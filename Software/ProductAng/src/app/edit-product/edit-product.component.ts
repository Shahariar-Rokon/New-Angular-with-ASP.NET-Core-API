import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../SharedModule/shared.module';
import { CommonModule } from '@angular/common';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,SharedModule,CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  upProduct:Product={
    id:'',
    name:'',
    type:'',
    color:'',
    price:0
  }
constructor(
  private productsService:ProductsService,
  private router:Router,
  private route:ActivatedRoute
  ){}
ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id=params.get('id');
        if(id){
          this.productsService.getProductById(id).subscribe({
            next:(product)=>{
              this.upProduct=product;
            },
          });
        }
      }
    })
}
updateProduct(){
  this.productsService.updateProduct(this.upProduct.id, this.upProduct).subscribe({
    next:(response)=>{
      this.router.navigate(['products']);
    },
    error:(response)=>{
      console.log(response)
    },
  });
}
}
