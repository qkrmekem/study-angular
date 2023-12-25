import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is Test', 
    'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg', [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]),
    new Recipe('A Test Recipe', 'This is Test', 
    'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg', [new Ingredient('Buns', 2), new Ingredient('Meat', 1)])
  ];

  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes[id]
  }

  constructor(private shoppingService: ShoppingListService) { }

  addIngredients(ingredients: Ingredient[]){
    this.shoppingService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
