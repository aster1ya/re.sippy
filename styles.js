import { StyleSheet } from "react-native";


//man, removing duplicate entries is gonna take ages

const styles = StyleSheet.create({
  h1: {
    fontSize:26,
    paddingBottom:10,
    textAlign:'center'
  },

  h2: {
    fontSize:20,
    paddingBottom:10,
    textAlign:'left'
  },

  layoutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  layoutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#4CAF50', // Green background for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25, // Makes the button round-squared
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // For shadow effect on Android
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },

  buttonText: {
    color: '#fff', // White text
    fontSize: 14,
    fontWeight: 'bold',
  },

  indexAppName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  indexTagline: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 5,
  },

  indexSafeArea: {
    flex: 1,
  },

  indexContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  indexTopSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },

  indexTopRowInline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  indexSectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  indexSearchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 10,
    width: 280,
    marginRight: 10,
  },

  indexSearchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },

  indexSearchIconInline: {
    marginRight: 5,
  },

  indexRecipeImage: {
    width: 380,
    height: 270,
    borderRadius: 20,
    resizeMode: 'cover',
    marginBottom: 10,
  },

  indexRecipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  indexRecipeInfo: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 10,
    textAlign: 'center',
  },

  indexTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },

  indexTabButton: {
    alignItems: 'center',
  },

  indexTabLabel: {
    fontSize: 12,
    marginTop: 2,
  },

  menuContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },

  menuTitle: {
    fontSize: 24, 
    marginBottom: 20,
  },

  bookTitle: {
    fontSize: 30,
    alignSelf: 'center',
    margin: 15,
  },

  searchSafeArea: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },

  searchContainer: {
    flex: 1,
    padding: 20,
  },

  searchTitle: {
    fontSize: 22,
    color: '#fff',
    fontWeight: "bold",
    marginBottom: 12,
  },

  searchNoResult: {
    color: '#ccc',
    fontSize: 16,
    marginTop: 40,
    textAlign: 'center',
  },

  searchMealCard: {
    marginBottom: 15,
    backgroundColor: '#2a2a2a',
    borderRadius: 10,
    overflow: 'hidden',
  },

  searchMealName: {
    color: '#fff',
    fontSize: 18,
    padding: 10,
  },

  searchMealImage: {
    height: 200,
    width: '100%',
  },

  baseContainer: {
    backgroundColor:'lightsalmon',
    borderColor:'lightsalmon',
    borderRadius:10,
    borderWidth:2.5,
    flex:1,
    margin:10,
    padding:10,
  },

  baseTitle: {
    flex:1,
    flexDirection:'row',
    fontSize:30,
    fontWeight:'bold',
    marginTop:10,
    paddingBottom:20,
    textAlign:'center',
  },

  baseSubContainer: {
    backgroundColor:'whitesmoke',
    borderColor:'whitesmoke',
    borderRadius:5,
    borderWidth:5,
    padding:10,
  },

  baseChecklist: {
    padding:5,
  },

  infoGrid: {
    alignItems:'flex-start',
    flex:3,
    flexDirection:'row',
    flexWrap:'wrap',
    fontSize:18,
    margin:10,
  },

  infoSection: {
    alignItems:'center',
    padding:5,
    width:'50%',
  },

  infoLabel: {
    fontWeight:'bold',
  },

  createTitle: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 30,
    paddingBottom: 20,
    textAlign: 'center',
  },

  infoField: {
    marginTop: -10,
  },

  detailSafeArea: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },

  detailContainer: {
    padding: 20,
  },

  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },

  detailSection: {
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
    marginBottom: 8,
    fontWeight: '600',
  },

  detailCategory: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 20,   
  },

  recipeImage: {
    width: '100%',
    height: 240,
    borderRadius: 10,
    marginBottom: 15,
  },

  recipeInstructions: {
    fontSize: 14,
    color: '#ddd',
    lineHeight: 22,
  },

  recipeIngredients: {
    fontSize: 14,
    color: '#eee',
    marginBottom: 2,
  },

  checkboxTextStyle: {
    fontSize:14, 
    textDecorationLine: 'none'
  },
  
  authLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },

  authError: {
    color: 'red',
  },
});

export default styles;