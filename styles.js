import { StyleSheet } from "react-native";

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
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
  },

  layoutTitle: {
    fontSize:24,
    fontWeight:'bold',
    marginBottom:20,
  },

  indexSafeArea: {
    backgroundColor:'lightsalmon',
    flex:1,
  },

  indexContainer: {
    backgroundColor:'whitesmoke',
    borderColor:'whitesmoke',
    borderRadius:10,
    borderWidth:2.5,
    flex:1,
    margin:10,
  },

  indexHeader: {
    backgroundColor:'whitesmoke',
    borderColor:'whitesmoke',
    borderRadius:10,
    borderWidth:2.5,
    margin:10,
    padding:20,
  },

  indexUserStatus: {
    fontSize:14,
    textAlign:'center',
    margin:5,
    paddingTop:10,
    paddingBottom:5,
  },
  
  indexAppTitle: {
    fontSize:60,
    fontWeight:'bold',
    alignSelf:'center',
    margin:15,
    paddingTop:25,
  },

  indexWelcome: {
    alignSelf:'center',
    fontSize:20,
    fontWeight:'bold',
    margin:15,
    paddingVertical:25,
  },

  indexTopRowInline: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginVertical:5,
    marginRight:10,
  },

  indexSearchBarContainer: {
    flexDirection:'row',
    alignItems:'center',
    borderRadius:25,
    paddingHorizontal:10,
    width:280,
    marginRight:5,
  },

  indexSearchBar: {
    flex:1,
    height:40,
    paddingHorizontal:10,
  },

  indexSearchIconInline: {
    marginRight:5,
  },

  indexTabContainer: {
    backgroundColor:'whitesmoke',
    borderColor:'whitesmoke',
    borderRadius:10,
    borderWidth:2.5,
    flexDirection:'row',
    justifyContent:'space-around',
    margin:10,
    padding:15,
  },

  indexTabButton: {
    backgroundColor:'tomato',
    flexDirection:'row',
    padding:5,
  },

  indexTabIcon: {
    margin:2.5,
  },

  indexTabLabel: {
    color:'white',
    fontWeight:'bold',
    padding:5,
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

  bookContainer: {
    backgroundColor:'lightsalmon',
    borderColor:'lightsalmon',
    borderRadius:10,
    borderWidth:2.5,
    flex:1,
    margin:10,
    padding:10,
  },

  bookTitle: {
    fontSize:30,
    alignSelf:'center',
    margin:15,
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

  baseSubContainer: {
    backgroundColor:'whitesmoke',
    borderColor:'whitesmoke',
    borderRadius:5,
    borderWidth:5,
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

  baseChecklist: {
    padding:5,
  },

  favButton: {
    alignItems:'center',
    margin:5,
    paddingTop:5,
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

  infoField: {
    marginTop: -10,
  },

  longButton: {
    margin:10,
  },
  
  hyperlink: {
    color:'tomato',
    textDecorationLine:'underline',
  },

  authError: {
    color: 'red',
  },

  authInput: {
    backgroundColor:'whitesmoke',
    borderColor:'whitesmoke',
    borderRadius:5,
    borderWidth:5,
    padding:5,
    marginTop:5,
    marginBottom:2
  }
});

export default styles;