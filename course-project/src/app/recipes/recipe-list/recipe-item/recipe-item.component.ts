import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  // 부모 컴포넌트의 [input] 속성과 매칭됨
  // [recipe] = "recipeEl"
  // 부모에 이렇게 선언이 되어 있으면 [recipe]와 recipe가 매칭이되고 값으로 recipeEl이 들어옴
  @Input() recipe: Recipe;
  @Output() selectedRecipe= new EventEmitter<void>();

  onSelected(){
    this.selectedRecipe.emit();
  }
}
