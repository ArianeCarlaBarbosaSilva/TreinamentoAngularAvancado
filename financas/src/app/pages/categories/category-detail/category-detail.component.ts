import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Category } from '../shared/category.model';
import { CategoryService } from '../shared/category.service';

import { switchMap } from 'rxjs/operators';

import toastr from "toastr";
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit, AfterContentChecked {

  currentAction: string; //new or edit
  categoryForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;
  category: Category = new Category();

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction == "new") {
      this.createCategory();
    } else { //currentAction = "edit"
      this.updateCategory();
    }
  }

  // PRIVATE METHODS
  private setCurrentAction() {
    if (this.route.snapshot.url[0].path == "new")
      this.currentAction = "new";
    else
      this.currentAction = "edit";
  }

  private buildCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory() {
    if (this.currentAction == "edit") {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get("id")))
      )
      .subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category) //pega dados da categoria carregada para o formulario
        },
        (error) => alert('Ocorreu um erro no servidor, tente mais tarde.')
      );
    }
  }

  private setPageTitle() {
    if (this.currentAction == "new") {
      this.pageTitle = "Cadastro de Nova Categoria";
    } else {
      const categoryName = this.category.name || "";
      this.pageTitle = "Editando Categoria: " + categoryName;
    }
  }

  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.create(category)
      .subscribe(
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      )
  }

  private updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category)
    .subscribe(
      category => this.actionsForSuccess(category),
      error => this.actionsForError(error)
    )
  }

  private actionsForSuccess(category: Category) {
    toastr.success("Solicitação processada com sucesso!");

    /*nomedosite.com/categories/new
      nomedosite.com/categories/
      nomedosite.com/categories/:id/edit*/
      //forcar o redirecionamento e recarga da página
      //nao adicionar essa rota no historico de navegacao do navegador

      this.router.navigateByUrl("categories", {skipLocationChange: true}).then(
        () => this.router.navigate(["categories", category.id, "edit"])
      ); 
  }

  private actionsForError(error) {
    toastr.error("Ocorreu um erro ao processar a sua solicitação!");

    this.submittingForm = false;

    if (error.status === 422) //o servidor rrecebeu a solicitação mas não conseguiu processar
      this.serverErrorMessages = JSON.parse(error._body).errors;
    else
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."]
  }
}
