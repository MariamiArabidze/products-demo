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
import { DeleteProductModalComponent } from '../delete-product-modal/delete-product-modal.component';
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


  openDeleteModal(product: any) {
    const dialogRef = this.dialog.open(DeleteProductModalComponent, {
      width: '400px',
      data: { product: product }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Handle the delete confirmation here
        // You might want to remove the item from the dataSource
        const index = this.dataSource.findIndex(item => item.code === product.code);
        if (index > -1) {
          this.dataSource.splice(index, 1);
          // If you're using MatTableDataSource, you need to refresh it:
          // this.dataSource._updateChangeSubscription();
          // Also clear the selection
          this.selection.clear();
        }
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

