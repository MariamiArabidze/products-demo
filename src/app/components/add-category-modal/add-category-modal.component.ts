import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../models/Category';
export interface CategoryModalData {
  parentCategory?: Category;
  editCategory?: Category;
  isEdit: boolean;
}

@Component({
  selector: 'app-add-category-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss']
})
export class AddCategoryModalComponent {
  categoryForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddCategoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryModalData,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });

    if (data.isEdit && data.editCategory) {
      this.categoryForm.patchValue({
        name: data.editCategory.name
      });
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      this.dialogRef.close(this.categoryForm.value);
    }
  }
}