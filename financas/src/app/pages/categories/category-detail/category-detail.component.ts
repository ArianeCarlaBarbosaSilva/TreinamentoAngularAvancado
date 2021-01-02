import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';
import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent extends BaseResourceFormComponent<Category> {

  constructor(protected categoryService: CategoryService, protected injector: Injector) {
    super(injector, new Category(), categoryService, Category.fromJson);
   }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  protected creationPageTitle(): string {
    return "Cadastro de Nova Categoria";
  }

  protected editionPageTitle(): string {
    const resourceName = this.resource.name || "";
    return "Editando Categoria: " + resourceName;
  }

}
