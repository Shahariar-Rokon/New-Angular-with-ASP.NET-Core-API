import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { Product } from '../product';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../SharedModule/shared.module';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,SharedModule,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(private productsService:ProductsService,private router:Router){}
  products:Product[]=[];
  ngOnInit():void{
  this.productsService.getAllProducts().subscribe({
    next:(products)=>(this.products=products),
    error:(response)=>(console.log(response))
  })
  }
  deleteProduct(id:string){
    this.productsService.deleteProduct(id).subscribe({
     next:(response)=>{
       let currentUrl=this.router.url;
       this.router.navigateByUrl('/',{skipLocationChange:true})
       .then(()=>{
         this.router.navigate([currentUrl]);
       })
     }
    })
   }
}
