import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  
  // ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatos', 5)
  // ];

  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListService:ShoppingListService){}
  
  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
      )
    }
    
    onIngrediantAdded(ingredient: Ingredient){
      this.ingredients.push(ingredient);
    }
    
    ngOnDestroy(): void {
      this.subscription.unsubscribe()
    }
}
