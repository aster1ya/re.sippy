//######################################################################################
//THIS MUST BE IDENTICAL TO backend/models/RecipeSchema BUT WITH ONLY THE TYPES DEFINED.
//######################################################################################

export default interface IRecipe {
  _id?: string;
  title: string;
  
  authorId: string;
  author?: string;
  mealType?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servings?: string;

  description?: string;
  ingredients: string;
  instructions: string;
  notes?: string;

  tags: string[];
  done?: string[];  // Array of user IDs who have marked this recipe as done
}
