import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private route:ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (param: Params) => {
          this.id = +param['id']
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      )
  }

  toShoppingList(ingredients: Ingredient[]){
    this.recipeService.addIngredients(ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
