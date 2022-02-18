
import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/auth/auth-guard.guard';
import { UsuariosComponent } from './page/usuarios.component';

export const USUARIOS_ROUTES: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    canActivate: [AuthGuard]
  }
]
