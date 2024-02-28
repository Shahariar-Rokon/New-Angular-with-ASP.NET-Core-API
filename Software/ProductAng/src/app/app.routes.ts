import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';

export const routes: Routes = [
{path:'',component:ProductsComponent},
{path:'Products',component:ProductsComponent},
{path:'Products/add',component:AddProductComponent},
{path:'Products/edit/:id',component:EditProductComponent},
];
