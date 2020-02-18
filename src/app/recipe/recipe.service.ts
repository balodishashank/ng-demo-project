import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject();
    private recipes: Recipe[] = [
        new Recipe(
            "A Pizza recipe",
            "This is a pizza view",
            "https://imgix.bustle.com/uploads/image/2019/1/2/c9bc4daf-9969-41b2-8bb0-93fd45ee05ff-jackfruit-pizza.jpg?w=970&h=546&fit=crop&crop=faces&auto=format&q=70",
            [
                new Ingredient('garlic', 1),
                new Ingredient('French fries', 20)
            ]),
        new Recipe(
            "A sapgetti recipe",
            "This is a sapgetti view",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR6WNxE7z-pSImNQx36Juwo3I6pASibjJO-tbeAS0Ui5hQc28AV",
            [
                new Ingredient('Meat', 1),
                new Ingredient('buns', 5)
            ])
    ];

    constructor(private slService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}