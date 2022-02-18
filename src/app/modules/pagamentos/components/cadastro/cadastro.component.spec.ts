import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PagamentoService } from '../../service/pagamento.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CadastroComponent } from './cadastro.component';

describe('CadastroComponent', () => {
    let component: CadastroComponent;
    let fixture: ComponentFixture<CadastroComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [CadastroComponent],
            providers: [NgbActiveModal, PagamentoService]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CadastroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dateText date to text ', () => {
        component.inputType = 'date'
        component.dateText()
        expect(component.inputType).toBe('date');
    });

    it('should dateText text to date ', () => {
        component.inputType = 'date'
        component.dateText()
        expect(component.inputType).toBe('date');
    });
});