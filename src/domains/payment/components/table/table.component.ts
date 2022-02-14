import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/domains/payment/models/Payment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, AfterViewInit {
  @Input() data: Payment[]
  @Output() onPaymentChange = new EventEmitter<Payment>();
  @Output() onEdit = new EventEmitter<Payment>();
  @Output() onDelete = new EventEmitter<Payment>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  public displayedColumns: string[] = ['name', 'title', 'date', 'value', 'isPayed', 'edit'];
  public dataSource: MatTableDataSource<any>;

  public showOptions: boolean = false;

  constructor() {
    this.dataSource = new MatTableDataSource(this.data)
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Payment>(this.data || []);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  public setPaymentStatus(payment: Payment): void {
    this.onPaymentChange.emit(payment)
  }

  public edit(payment: Payment): void {
    this.onEdit.emit(payment)
  }

  public delete(payment: Payment): void {
    this.onDelete.emit(payment)
  }
}