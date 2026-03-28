import { Component } from '@angular/core';
import { ProductsComponent } from '../products/products';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsComponent],

  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {



}
