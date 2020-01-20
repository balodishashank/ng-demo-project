import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
            "A Test recipe",
            "This is simply a test",
            "../../assets/download.jfif",
            [
                new Ingredient('Meat', 1),
                new Ingredient('French fries', 20)
            ]),
        new Recipe(
            "Another Test recipe",
            "This is simply a test",
            "../../assets/download.jfif",
            [
                new Ingredient('Meat', 1),
                new Ingredient('buns', 5)
            ])
    ];

    constructor(private slService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}