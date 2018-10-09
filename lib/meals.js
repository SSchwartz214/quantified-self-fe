let baseUrl = 'https://fast-meadow-36413.herokuapp.com';

const getMeals = () => {
  fetch(`${baseUrl}/api/v1/meals`)
  .then(response => response.json())
  .then(meals => appendMeals(meals))
  .then(meals => appendCalorieCounts())
  .catch(error => console.error({ error }))
}

const appendMeals = (meals) => {
  meals.forEach((meal) => {
    appendMealFoods(meal)
  })
}

const appendMealFoods = (meal) => {
  meal['foods'].forEach((food) => {
    appendMealFood(meal, food)
  })
}

const appendMealFood = (meal, food) => {
  var id = `#${meal.name}-table`
  $(id.toLowerCase()).append(`
    <tr>
    <td>${food.name}</td>
    <td>${food.calories}</td>
    </tr>
  `)
}

const appendCalorieCounts = () => {
  appendCaloriesBreakfast();
  appendCaloriesLunch();
  appendCaloriesDinner();
  appendCaloriesSnacks();
}

const appendCaloriesBreakfast = () => {
  $('#breakfast-table').append(`
    <tr>
    <th>Total Calories</th>
    <th>374</th>
    </tr>
    <tr>
    <th>Remaining Calories</th>
    <th>26</th>
    </tr>`
  )
}

const appendCaloriesLunch = () => {
  $('#lunch-table').append(`
    <tr>
    <th>Total Calories</th>
    <th>374</th>
    </tr>
    <tr>
    <th>Remaining Calories</th>
    <th>26</th>
    </tr>`
  )
}

const appendCaloriesDinner = () => {
  $('#dinner-table').append(`
    <tr>
    <th>Total Calories</th>
    <th>374</th>
    </tr>
    <tr>
    <th>Remaining Calories</th>
    <th>26</th>
    </tr>`
  )
}

const appendCaloriesSnacks = () => {
  $('#snacks-table').append(`
    <tr>
      <th>Total Calories</th>
      <th>374</th>
    </tr>
    <tr>
      <th>Remaining Calories</th>
      <th>26</th>
    </tr>`
  )
}

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
  $('#foods').append(`
    <tr>
      <td><input type="checkbox"></td>
      <td class="name">${food.name}</td>
      <td class="calories">${food.calories}</td>
    </tr>
  `);
};

getMeals();
getFoods();
