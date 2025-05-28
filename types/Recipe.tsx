//######################################################################################
//THIS MUST BE IDENTICAL TO backend/models/RecipeSchema BUT WITH ONLY THE TYPES DEFINED.
//######################################################################################

export default interface IRecipe {
  _id: String;

  title: String;

  authorId: String;
  mealType: String;
  prepTime: String;
  cookTime: String;
  totalTime: String;
  servings: String;

  description?: String;
  ingredients?: String;
  instructions?: String;
  notes?: String; 

  tags: [String];
};
