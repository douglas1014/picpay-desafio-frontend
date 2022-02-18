import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/modules/auth/services/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public hasToken: boolean;
  public user$: Observable<any>;
  public user: any;

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.user$ = usuarioService.getUser;
    this.user$.subscribe(user => this.user = user);
   }

   public logout(): void {
    this.usuarioService.logout();
    this.router.navigate(['/auth']);
  }
}
