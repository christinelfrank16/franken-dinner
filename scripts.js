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
const instructionChangeReducer = (state = initialState.recipesById, action ) => {
let newArrayPosition;
let newRecipesByIdEntry;
let newRecipesByIdStateSlice;
switch(action.type){
    case 'NEXT_INSTRUCTION':
    newArrayPosition = state[action.currentRecipeId].arrayPosition + 1;
    newRecipesByIdEntry = Object.assign({}, state[action.currentRecipeId], { arrayPosition: newArrayPosition});
    newRecipesByIdStateSlice = Object.assign({}, state, {[action.currentRecipeId]: newRecipesByIdEntry});
    return newRecipesByIdStateSlice;
case 'RESTART_RECIPE':
    newRecipesByIdEntry = Object.assign({}, state[action.currentRecipeId], { arrayPosition: 0 });
    newRecipesByIdStateSlice = Object.assign({}, state, { [action.currentRecipeId]: newRecipesByIdEntry });
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

const rootReducer = this.Redux.combineReducers({
    currentRecipeId: recipeChangeReducer,
    recipesById: instructionChangeReducer
});

// Redux store
const { createStore } = Redux;
const store = createStore(rootReducer);

// render state in DOM
const renderInstructions = () => {
    const instructionsDisplay = document.getElementById('instructions');
    while(instructionsDisplay.firstChild){
        instructionsDisplay.removeChild(instructionsDisplay.firstChild);
    }
    if(store.getState().currentRecipeId){
        const currentRecipeId = store.getState().currentRecipeId;
        const currentStep = store.getState().recipesById[currentRecipeId].recipeArray[store.getState().recipesById[currentRecipeId].arrayPosition];
        const renderedStep = document.createTextNode(currentStep);
        document.getElementById('instructions').appendChild(renderedStep);
    } else {
        const selectRecipeMessage = document.createTextNode('Select a recipe from the menu above to make it!');
        document.getElementById('instructions').appendChild(selectRecipeMessage);
    }
}

const renderRecipes = () => {
    const recipesById = store.getState().recipesById;
    for(const recipeKey in recipesById){
        const recipe = recipesById[recipeKey];
        const li = document.createElement('li');
        const h3 = document.createElement('h3');
        const recipeName = document.createTextNode(recipe.name);
        h3.appendChild(recipeName);
        h3.addEventListener('click', function() {
            selectRecipe(recipe.recipeId);
        });
        li.appendChild(h3);
        document.getElementById('recipes').appendChild(li);
    }
}

window.onload = function() {
    renderRecipes();
    renderInstructions();
}

// click listener
const selectRecipe = (newRecipeId) => {
    let action;
    if(store.getState().currentRecipeId){
        action = {
            type: 'RESTART_RECIPE',
            currentRecipeId: store.getState().currentRecipeId
        }
    }
    action = {
        type : 'CHANGE_RECIPE',
        newSelectedRecipeId: newRecipeId
    }
    store.dispatch(action);
}

const userClick = () => {
    const currentState = store.getState().recipesById[store.getState().currentRecipeId];
    if(currentState.arrayPosition === currentState.recipeArray.length - 1 ){
        store.dispatch({
            type: 'RESTART_RECIPE',
            currentRecipeId: store.getState().currentRecipeId
        });
    } else {
        store.dispatch({
            type: 'NEXT_INSTRUCTION',
            currentRecipeId: store.getState().currentRecipeId
        });
    }
}

store.subscribe(renderInstructions);

