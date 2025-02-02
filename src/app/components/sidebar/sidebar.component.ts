import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Category } from '../../models/Category';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DeleteCategoryModalComponent } from '../delete-category-modal/delete-category-modal.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  treeControl = new NestedTreeControl<Category>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Category>();
  selectedNode: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategoryTreeMock().subscribe({
      next: (data) => {
        this.dataSource.data = [data];
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  hasChild = (_: number, node: Category) => !!node.children && node.children.length > 0;

  onNodeSelect(node: Category, event: MouseEvent) {
    // Handle expand/collapse button click
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.tagName === 'MAT-ICON') {
      event.stopPropagation();
      this.treeControl.toggle(node);
      return;
    }

    // Select the node
    this.selectedNode = node;

    // If it's a leaf node (no children), load products
    if (!this.hasChild(0, node)) {
      this.loadProducts(node);
    }
  }

  loadProducts(node: Category) {
    this.productService.getProductsByCategoryMock(node.id).subscribe({
      next: (products) => {
        this.productService.updateProducts(products);
      },
      error: (error) => {
        console.error('Error loading products:', error);
      }
    });
  }

  addCategory() {
    if (!this.selectedNode) {
      console.log('Adding root category');
    } else {
      console.log('Adding child category to:', this.selectedNode.name);
    }
    // TODO: Implement add category dialog with parentId = selectedNode?.id
  }

  editCategory() {
    if (!this.selectedNode) return;
    console.log('Edit category:', this.selectedNode);
  }

  deleteCategory() {
    if (!this.selectedNode) return;

    const dialogRef = this.dialog.open(DeleteCategoryModalComponent, {
      width: '400px',
      data: {
        category: this.selectedNode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log('Delete category:', this.selectedNode);
        // TODO: Call your service to delete the category
        // this.categoryService.deleteCategory(this.selectedNode.id)
      }
    });
  }

  isSelected(node: Category): boolean {
    return this.selectedNode?.id === node.id;
  }
}
