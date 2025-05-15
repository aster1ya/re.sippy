//THIS MUST BE IDENTICAL TO backend/models/RecipeSchema BUT WITH ONLY THE TYPES DEFINED

//Should really use 'string' instead of 'String' but im sure its fine

export default interface IRecipe {
  _id: string;
  title: String;
  description?: String;
  ingredients?: String;
  instructions?: String;

  authorId: string;

  rating: Number;
  difficulty: String;
  cookTime: String;
  categories: [String];

  isGlutenFree?: Boolean;
  isVegetarian?: Boolean;
  isVegan?: Boolean;
  isHalal?: Boolean;
  isPet?: Boolean;
}
