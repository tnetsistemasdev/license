import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductsComponent} from "./components/products/products.component";
import {NotFountComponent} from "./components/errors/not-fount/not-fount.component";
import {RegisterComponent} from "./components/register/register/register.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: 'register/:aplication/:dominio', component: RegisterComponent},
  {path: 'login/:aplication/:dominio', component: LoginComponent},
  {path: 'tstore/:contact_id/:redirect', component: ProductsComponent},
  {path: '', component:NotFountComponent },
  {path: 'not-found/:message', component:NotFountComponent }
];

@NgModule({
  declarations:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
