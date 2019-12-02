// Instructions
const instructionsList = {
    1: `Butter one side of each slice of bread, 
    Place both bread slices butter side down on a pre-heated pan,
    Place cheese on both slices of bread and cover pan with a lid,
    Once cheese has melted smash slices together,
    Enjoy!`.split(","),
    2: `Fry bacon in a skillet,
    Once cooked set aside on paper towel for later use,
    Toast bread, 
    While bread is toasting slice tomato and avocado,
    Wash and tear lettuce,
    Spread avocado on one slice of the toasted bread,
    On same slice add lettuce,
    On the other slice spread mayo and add tomato slices,
    Place bacon on either slice, 
    Put slices together, 
    Cut in half (diagonally!!!) and enjoy!`.split(',')
};

// Initial redux state
const initialState = {
    currentRecipeId: null,
    recipesById: {
        1: {
            name: 'Grilled Cheese Sandwich', 
            recipeId: 1,
            recipeArray: instructionsList[1],
            arrayPosition: 0,
        },
        2: {
            name: 'BLAT Sandwich', 
            recipeId: 2,
            recipeArray: instructionsList[2],
            arrayPosition: 0,
        }
    }
}

// Reducer
const recipeChangeReducer = (state = initialState.recipesById, action ) => {
let newArrayPosition;
let newRecipesByIdEntry;
let newRecipesByIdStateSlice;
switch(action.type){
    case 'NEXT_INSTRUCTION':
    newArrayPosition = state[action.currentRecipeId].arrayPostion + 1;
    newRecipessByIdEntry = Object.assign({}, state[action.currentRecipeId], { arrayPostion: newArrayPosition});
    newRecipesByIdStateSlice = Object.assign({}, state, {[action.currentRecipeId]: newRecipessByIdEntry});
    return newRecipesByIdStateSlice;
case 'RESTART_RECIPE':
    newRecipessByIdEntry = Object.assign({}, state[action.currentRecipeId], { arrayPostion: 0 });
    newRecipesByIdStateSlice = Object.assign({}, state, { [action.currentRecipeId]: newRecipessByIdEntry });
    return newRecipesByIdStateSlice;
default:
    return state;
}
};

const recipeChangeReducer = (state = initialState.currentRecipeId, action ) => {
    switch (action.type) {
        case 'CHANGE_RECIPE':
        return action.newSelectedRecipeId
        
        default:
        return state;
    }
}