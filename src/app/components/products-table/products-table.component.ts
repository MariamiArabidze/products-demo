import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatHeaderRowDef, MatRowDef, MatTable } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../add-product-modal/product-modal.component';
import { Product } from '../../models/Product';
@Component({
  selector: 'app-products-table',
  standalone: true,
  imports: [MatTableModule, MatHeaderRowDef, MatRowDef, MatTable, MatCheckboxModule, MatIconModule, MatButtonModule, MatDialogModule, ProductModalComponent],
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss'
})
export class ProductsTableComponent {
  displayedColumns: string[] = ['select', 'position', 'name', 'price'];
  selection = new SelectionModel<any>(true, []);
  dataSource = [
    {
      code: 'WH001',
      name: 'Wireless Headphones',
      price: 129.99,
      country: 'USA',
      timeFrom: new Date('2024-01-01'),
      timeTo: new Date('2024-12-31')
    },
    {
      code: 'SW002',
      name: 'Smart Watch',
      price: 249.99,
      country: 'Japan',
      timeFrom: new Date('2024-01-01'),
      timeTo: new Date('2024-12-31')
    },
    {
      code: 'BS003',
      name: 'Bluetooth Speaker',
      price: 79.99,
      country: 'Germany',
      timeFrom: new Date('2024-01-01'),
      timeTo: new Date('2024-12-31')
    },
    {
      code: 'PB004',
      name: 'Power Bank',
      price: 49.99,
      country: 'China',
      timeFrom: new Date('2024-01-01'),
      timeTo: new Date('2024-12-31')
    }
  ];

  constructor(private dialog: MatDialog) { }

  openAddModal() {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('New product:', result.product);
      }
    });
  }

  openEditModal(product: Product) {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      data: {
        mode: 'edit',
        product: { ...product }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Updated product:', result.product);
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource);
  }
}

