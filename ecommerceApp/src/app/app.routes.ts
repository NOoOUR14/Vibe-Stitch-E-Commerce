import { Routes } from '@angular/router';
import { AdminLayout } from './components/admin/admin-layout/admin-layout';
import { DashboardHome } from './components/admin/dashboard-home/dashboard-home';
import { ManageProductsComponent } from './components/admin/manage-products/manage-products';
import { ProductsComponent } from './components/products/products';
import { Home } from './components/home/home';
import { authGuard } from './guards/auth-guard';
import { ProductDetails } from './components/products/product-details/product-details';
import { LoginComponent } from './components/login/login';
import { CartComponent } from './components/cart/cart';
import { CheckoutComponent } from './components/checkout/checkout';
import { RegisterComponent } from './pages/register/register';
import { MyOrdersComponent } from './pages/my-orders/my-orders';
import { ManageReviewsComponent } from './components/admin/manage-reviews/manage-reviews';
import { FaqComponent } from './faq/faq';
import { AboutComponent } from './about/about';
import { ContactComponent } from './contact-us/contact-us';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetails },
  { path: 'cart', component: CartComponent },

  { path: 'checkout', component: CheckoutComponent, canActivate:[authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'my-order', component: MyOrdersComponent, canActivate:[authGuard]},
  { path: 'faq', component: FaqComponent, title:'V&S - Frequently Asked Questions'},
  { path: 'about', component: AboutComponent},
  { path: 'contact-us', component: ContactComponent},


  {  path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardHome },
      { path: 'manage-products', component: ManageProductsComponent },
      { path: 'manage-reviews', component: ManageReviewsComponent },

    ]

  },

  { path: '**', redirectTo: '' },
];
