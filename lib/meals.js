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
    appendMeal(meal)
  })
}

const appendMeal = (meal) => {
  meal['foods'].forEach((food) => {
    appendFood(meal, food)
  })
}

const appendFood = (meal, food) => {
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
  $('#snack-table').append(`
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

getMeals();
