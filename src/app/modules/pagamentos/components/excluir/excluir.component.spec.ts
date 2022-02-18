import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PagamentoService } from '../../service/pagamento.service';

import { ExcluirComponent } from './excluir.component';

describe('ExcluirComponent', () => {
    let component: ExcluirComponent;
    let fixture: ComponentFixture<ExcluirComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [ExcluirComponent],
            providers: [NgbActiveModal, PagamentoService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExcluirComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
