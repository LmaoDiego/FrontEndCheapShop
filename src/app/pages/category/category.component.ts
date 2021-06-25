import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Category} from "../../models/category/category";
import {CategoriesApiService} from "../../services/categories-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as _ from "lodash";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
//
  @ViewChild('categoryForm', { static: false })
  categoryForm!: NgForm;
  isEditMode= false;
  categoryId!: number;
  categoryData: Category = {} as Category;
  defaultCategory: Category = { id: 0, name: '',description: ''};
//
  constructor(private categoriesApi:CategoriesApiService, private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveCategory(id);
        this.isEditMode = true;
        return id;
      } else {
        this.resetCategory();
        this.isEditMode = false;
        return 0;
      }
    }));
  }
  navigateToCategories(): void {
    this.router.navigate(['/categories'])
      .then(() => console.log(this.route.url) );
  }
  resetCategory(): void {
    this.categoryData = this.defaultCategory;
  }
  retrieveCategory(id: number): void {
    this.categoriesApi.getCategoryById(id)
      .subscribe((response: Category) => {
        this.categoryData = {} as Category;
        this.categoryData = _.cloneDeep(response);
        console.log(response);
        console.log(this.categoryData);
      });
  }
  addCategory(): void {
    const newCategory = {name: this.categoryData.name, description: this.categoryData.description};
    this.categoriesApi.addCategory(newCategory)
      .subscribe(() => {
        this.navigateToCategories();
      });
  }
  cancelEdit(): void {
    this.navigateToCategories();
  }
  updateCategory(): void {
    this.categoriesApi.updateCategory(this.categoryData.id, this.categoryData as Category)
      .subscribe(response => {
        console.log(response);
      });
    this.navigateToCategories();
  }
  onSubmit(): void {
    if (this.categoryForm.form.valid) {
      console.log(this.categoryData);
      if (this.isEditMode) {
        this.updateCategory();
      } else {
        this.addCategory();
      }
    } else {
      console.log('Invalid Data');
    }
  }


}
