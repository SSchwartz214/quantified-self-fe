const getFoods = () => {
  fetch(`https://fast-meadow-36413.herokuapp.com/api/v1/foods`)
    .then(response => response.json())
    .then(foods => appendFoods(foods))
    .catch(error => console.error({ error }));
};

const appendFoods = (foods) => {
  foods.forEach(food => {
    appendFood(food);
  });
};

const appendFood = (food) => {
  $('#all-foods').append(`
    <tr>
      <td class="checkbox" id=${food.id}><input type="checkbox"></td>
      <td class="name">${food.name}</td>
      <td class="calories">${food.calories}</td>
    </tr>
  `);
};

const generateRecipes = () => {
  $('#recipes-table thead').remove()
  $('#recipes-table tbody').empty()
  $('#recipes-table').append(`
  <thead>
    <tr>
      <th>Image</th>
      <th>Recipe</th>
      <th>Source</th>
      <th>Rating</th>
    </tr>
  </thead>
  `)
  let selectedFoods = []
  let endpoint = 'http://api.yummly.com/v1/api/recipes?_app_id=0abefa69&_app_key=7187e41369f5ac5e128f3cafc3f81070&'
  $('#all-foods').find('input[type="checkbox"]:checked').each(function (index, row) {
    let elements = row.parentNode.parentNode.querySelectorAll('td')
    let foodName = elements[1].innerHTML.toLowerCase()
    selectedFoods.push(foodName)
  })
  selectedFoods.forEach(function(foodName) {
    endpoint += `allowedIngredient[]=${foodName}&`
  })
  fetch(endpoint)
    .then(response => response.json())
    .then(recipes => appendRecipes(recipes))
    .catch(error => console.error({ error }))
}

const appendRecipes = (recipes) => {
  let ingredients = recipes.criteria.allowedIngredient
  let yummlyHTML = recipes.attribution.html
  let totalMatches = recipes.totalMatchCount
  let matchingRecipes = recipes.matches
  matchingRecipes.forEach(recipe => {
    appendRecipe(recipe)
  })
}

const appendRecipe = (recipe) => {
  let imageUrl = recipe.smallImageUrls.pop()
  let name = recipe.recipeName
  let source = recipe.sourceDisplayName
  let rating = recipe.rating
  $('#recipes-table tbody').append(`
    <tr>
      <td><img src=${imageUrl} alt="food"></td>
      <td>${name}</td>
      <td>${source}</td>
      <td>${rating}</td>
    </tr>
  `)
}

$('#generate-recipes-button').click(generateRecipes)

getFoods()
