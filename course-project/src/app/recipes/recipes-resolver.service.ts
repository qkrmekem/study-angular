import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipeResolverService {
    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService){}
    resolve(){
        const recipes = this.recipeService.getRecipes();

        if(recipes.length === 0){
            return this.dataStorageService.fetchRecipes();
        }else{
            return recipes;
        }
        
    }
}

export const recipesResolver: ResolveFn<Recipe[]> =
    (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        return inject(RecipeResolverService).resolve();
    };

// bootstrapApplication(App, {
//     providers: [provideRouter([{
//         path: 'detail/:id',
//         component: HeroDetailComponent,
//         resolve: { hero: heroResolver },
//     }])]
// });