import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService) { }

    storeRecipies() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ngcourse-recipe-book-c7380.firebaseio.com/recipes.json', recipes).subscribe((res) => {
            console.log(res);
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://ngcourse-recipe-book-c7380.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                }),
                    tap((recipes: Recipe[]) => {
                        this.recipeService.setRecipes(recipes);
                    })
            }))
    }
}