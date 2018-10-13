let baseUrl = 'https://fast-meadow-36413.herokuapp.com';

let breakfastCalories = 0;
let goalBreakfastCalories = 500

let lunchCalories = 0;
let goalLunchCalories = 500

let dinnerCalories = 0;
let goalDinnerCalories = 600;

let snackCalories = 0;
let goalSnackCalories = 400;

let goalCalories = 2000;
let caloriesConsumed = 0;

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
  $('#calories-consumed').html(caloriesConsumed);
  $('#calories-remaining').html(goalCalories - caloriesConsumed)
}

const appendMealFood = (meal, food) => {
  var id = `#${meal.name}-table`
  caloriesConsumed += food.calories;
  $(id.toLowerCase()).append(`
    <tr>
      <td>${food.name}</td>
      <td id='${meal.name.toLowerCase()}-item-calories'>${food.calories}</td>
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
      <th id="total-breakfast-calories"</th>
    </tr>
    <tr>
      <th>Remaining Calories</th>
      <th id="remaining-breakfast-calories"></th>
    </tr>`
  )
  $('td#breakfast-item-calories').each(function(index, item) {
    breakfastCalories += parseInt(item.innerHTML)
  });
  $('th#total-breakfast-calories').html(breakfastCalories);
  $('th#remaining-breakfast-calories').html(goalBreakfastCalories - breakfastCalories);
}

const appendCaloriesLunch = () => {
  $('#lunch-table').append(`
    <tr>
      <th>Total Calories</th>
      <th id="total-lunch-calories"></th>
    </tr>
    <tr>
      <th>Remaining Calories</th>
      <th id="remaining-lunch-calories"></th>
    </tr>`
  )
  $('td#lunch-item-calories').each(function(index, item) {
    lunchCalories += parseInt(item.innerHTML)
  });
  $('th#total-lunch-calories').html(lunchCalories);
  $('th#remaining-lunch-calories').html(goalLunchCalories - lunchCalories);
}

const appendCaloriesDinner = () => {
  $('#dinner-table').append(`
    <tr>
      <th>Total Calories</th>
      <th id="total-dinner-calories"></th>
    </tr>
    <tr>
      <th>Remaining Calories</th>
      <th id="remaining-dinner-calories"></th>
    </tr>`
  )
  $('td#dinner-item-calories').each(function(index, item) {
    dinnerCalories += parseInt(item.innerHTML)
  });
  $('th#total-dinner-calories').html(dinnerCalories);
  $('th#remaining-dinner-calories').html(goalDinnerCalories - dinnerCalories);
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
      <td><input type="checkbox"></td>
      <td class="name">${food.name}</td>
      <td class="calories">${food.calories}</td>
    </tr>
  `);
};

const calculateCalorieTotals = () => {
  $('#goal-calories').html(goalCalories);
}

const filterFoods = () =>  {
  $(".input-field").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#all-foods tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
}

getMeals();
calculateCalorieTotals();
getFoods();
$(document).ready(filterFoods);