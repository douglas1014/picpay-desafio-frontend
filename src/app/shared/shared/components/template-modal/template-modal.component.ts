import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-template-modal',
  templateUrl: './template-modal.component.html',
  styleUrls: ['./template-modal.component.scss']
})
export class TemplateModalComponent {

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public close: EventEmitter<any> = new EventEmitter();
  @Input() public title: string;

  public closeModal(): void {
    this.close.emit();
  }
}
