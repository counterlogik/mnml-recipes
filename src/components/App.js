// import React from "react";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
// import RecipeList from "./RecipeList";
// import RecipeDetails from "./RecipeDetails";
// import base from "../base";
// import NotFound from "./NotFound";

// class App extends React.Component {
//   state = {
//     recipes: {},
//     ingredients: {},
//     steps: {}
//   };

//   componentDidMount() {
//     base.syncState("recipes", {
//       context: this,
//       state: "recipes"
//     });
//     base.syncState("ingredients", {
//       context: this,
//       state: "ingredients"
//     });
//     base.syncState("steps", {
//       context: this,
//       state: "steps"
//     });
//   }

//   addRecipe = title => {
//     const recipes = this.state.recipes;
//     recipes[`recipe-${Date.now()}`] = {
//       title: title,
//       uid: `recipe-${title}`
//     };
//     this.setState({ recipes });
//   };

//   deleteRecipe = id => {
//     const recipes = { ...this.state.recipes };
//     recipes[id] = null;
//     this.setState({ recipes });
//   };

//   loadRecipe = id => {
//     this.setState({ loadedRecipe: id });
//   };

//   updateRecipe = recipes => {
//     this.setState({ recipes });
//   };

//   render() {
//     return (
//       <BrowserRouter>
//         <div className="App">
//           <Switch>
//             <Route
//               path={"/"}
//               exact
//               render={() => {
//                 return (
//                   <RecipeList
//                     recipes={this.state.recipes}
//                     addRecipe={this.addRecipe}
//                     deleteRecipe={this.deleteRecipe}
//                     loadRecipe={this.loadRecipe}
//                   />
//                 );
//               }}
//             />
//             <Route
//               path={"/recipeDetails"}
//               render={() => {
//                 return (
//                   <RecipeDetails
//                     loadedRecipe={this.state.loadedRecipe}
//                     recipes={this.state.recipes}
//                     updateRecipe={this.updateRecipe}
//                   />
//                 );
//               }}
//             />
//             <Route path={"/notFound"} component={NotFound} />
//           </Switch>
//         </div>
//       </BrowserRouter>
//     );
//   }
// }

// export default App;

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actionCreators from "../actions/actionCreators";
import Main from "./Main";

function mapStateToProps(state) {
  return {
    recipes: state.recipes,
    ingredients: state.ingredients,
    steps: state.steps
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
