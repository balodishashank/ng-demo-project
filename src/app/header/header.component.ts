import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styles: ['./header.component.html']
})

export class HeaderComponent {
    constructor(private dataStorageService: DataStorageService,
        private recipeService: RecipeService) { }

    @Output() featureSelected = new EventEmitter<string>();

    onSelect(feature: string) {
        this.featureSelected.emit(feature);
    }

    onSaveData() {
        this.dataStorageService.storeRecipies();
    }

    onFetchRecipes() {
        this.dataStorageService.fetchRecipes().subscribe();
    }
}