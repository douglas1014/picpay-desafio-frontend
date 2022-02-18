import { Routes } from "@angular/router";
import { AuthGuard } from "./core/auth/auth-guard.guard";

import { LayoutAuthComponent } from "./core/components/layout-auth/page/layout-auth.component";
import { LayoutNoAuthComponent } from "./core/components/layout-no-auth/layout-no-auth.component";



export const APP_ROUTES: Routes = [
  {
    path: "",
    component: LayoutAuthComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "pagamentos",
        loadChildren: () =>
        import('./modules/pagamentos/pagamentos.module').then(
            (m) => m.PagamentosModule
        )
      },
      {
        path: "usuarios",
        loadChildren: () =>
        import('./modules/usuarios/usuarios.module').then(
            (m) => m.UsuariosModule
        )
      }
    ]
  },
  {
    path: "auth",
    component: LayoutNoAuthComponent,
    loadChildren: () =>
    import('./modules/auth/auth.module').then(
        (m) => m.AuthModule
    )
  }
];
