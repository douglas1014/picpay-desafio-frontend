import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { map } from 'rxjs/operators';

import { UsuariosInfoDto } from 'src/app/core/dtos/usuarios-info-dto';

import { UsuarioService } from '../../auth/services/usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  public dataSource: UsuariosInfoDto[] = [];
  public orderItens: string;

  constructor(
    private usuarioService: UsuarioService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  public getAll(params?: URLSearchParams ): void {
    this.usuarioService.getByFilter(params)
    .pipe(map(res => res.map((item) => new UsuariosInfoDto(item))))
      .subscribe((res) => {
      this.dataSource = res;
    });
  }

  public filter(value?: string, order?: boolean): void {
    const params: URLSearchParams = new URLSearchParams();
    if (value && !order) {
      params.append('name', value);
    }

    if (order) {
      (this.orderItens === 'asc') ? this.orderItens = 'desc' : this.orderItens = 'asc';
      params.append('_sort', value);
      params.append('_order', this.orderItens);
    }
    
    this.getAll(params);
  }

  public remover(item: UsuariosInfoDto): void {
  }

  public update(item: UsuariosInfoDto): void {
  }

  public openModal(): void { 
  }
}
