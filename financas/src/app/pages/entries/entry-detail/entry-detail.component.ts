import { Component, OnInit, Injector } from '@angular/core';
import { Validators } from '@angular/forms';

import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component';

import { Entry } from '../shared/entry.model';
import { EntryService } from '../shared/entry.service';
import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

@Component({
  selector: 'app-entry-detail',
  templateUrl: './entry-detail.component.html',
  styleUrls: ['./entry-detail.component.css']
})
export class EntryDetailComponent extends BaseResourceFormComponent<Entry> implements OnInit{

  categories: Array<Category>;

  imaskConfig = {
    mask: Number,
    scale: 2, //dois decimais depois da vírgula
    thousandsSeparator: '', //sem separador de milhar
    padFractionalZeros: true, //completa os centavos com zeros caso não sejam digitados 2 digitos
    normalizeZeros: true,
    radix: ',' //separador de decimais é virgula
  };

  ptBR = {
    firstDayOfWeek: 0,
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    dayNamesMin: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
    monthNames: [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
      'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ],
    monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    today: 'Hoje',
    clear: 'Limpar'
  }

  constructor(
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    protected injector: Injector
    ) {
      super(injector, new Entry(), entryService, Entry.fromJson);
     }

  ngOnInit(): void {
    this.loadCategories();
    super.ngOnInit();
  }

  //[ { income: 'Receita' }, { expense: 'Despesa' } ]
  get typeOptions(): Array<any> {
    return Object.entries(Entry.types).map(
      ([value, text]) => {
        return {
          text: text,
          value: value
        }
      }
    )
  }

  private loadCategories() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories
    );
  }

  protected buildResourceForm() {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ["expense", [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]
    });
  }

  protected creationPageTitle(): string {
    return "Cadastro de Novo Lançamento";
  }

  protected editionPageTitle(): string {
    const resourceName = this.resource.name || "";
    return "Editando Lançamento: " + resourceName;
  }
}
