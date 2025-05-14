//THIS MUST BE IDENTICAL TO backend/models/RecipeSchema BUT WITH ONLY THE TYPES DEFINED

//idk if these should be 'String' or 'string'
//_id has to be "string"
export default interface RecipeType {
  _id: string;
  title: String;
  description: String;
  ingredients: String;
  instructions: String;

  //author: { type: mongoose.Schema.Types.ObjectId, ref:'UserSchema', required: true },

  rating: Number;
  difficulty: String;
  cookTime: String;
  categories: [String];

  isGlutenFree: Boolean;
  isVegetarian: Boolean;
  isVegan: Boolean;
  isHalal: Boolean;
  isPet: Boolean;
}
