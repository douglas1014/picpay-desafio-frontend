import { Routes } from '@angular/router';
import { PagamentosComponent } from './page/pagamentos/pagamentos.component';
import { AuthGuard } from '../../core/auth/auth-guard.guard';


export const PAGAMENTOS_ROUTES: Routes = [
  {
    path: '',
    component: PagamentosComponent,
    canActivate: [AuthGuard]
  }
]
