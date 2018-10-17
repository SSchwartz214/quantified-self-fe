let baseUrl = 'https://quantified-self-express-be.herokuapp.com'

let breakfastCalories = 0
let goalBreakfastCalories = 500

let lunchCalories = 0
let goalLunchCalories = 500

let dinnerCalories = 0
let goalDinnerCalories = 600

let snackCalories = 0
let goalSnackCalories = 400

let goalCalories = 2000
let caloriesConsumed = 0

const getMeals = () => {
  fetch(`${baseUrl}/api/v1/meals`)
    .then(response => response.json())
    .then(meals => appendMeals(meals))
    .then(meals => appendCalorieCounts())
    .catch(error => console.error({ error }))
}

// const clearMealTables = () => {
//   $('#table-1').empty()
//   $('#table-3').empty()
//   $('#table-4').empty()
//   $('#table-2').empty()
// }

const appendMeals = (meals) => {
  meals.forEach((meal) => {
    appendMealFoods(meal)
  })
}

const appendMealFoods = (meal) => {
  meal['foods'].forEach((food) => {
    appendMealFood(meal, food)
  })
  $('#calories-consumed').html(caloriesConsumed)
  $('#calories-remaining').html(goalCalories - caloriesConsumed)
}

const appendMealFood = (meal, food) => {
  var id = `#table-${meal.id}`
  caloriesConsumed += food.calories
  $(id.toLowerCase()).append(`
    <tr>
      <td>${food.name}</td>
      <td id='${meal.name.toLowerCase()}-item-calories'>${food.calories}</td>
      <td><button type="button" class="remove-food-button" id=${food.id}>Remove</button></td>
    </tr>
  `)
}

const appendCalorieCounts = () => {
  appendCaloriesBreakfast()
  appendCaloriesLunch()
  appendCaloriesDinner()
  appendCaloriesSnacks()
}

const appendCaloriesBreakfast = () => {
  $('#table-1').append(`
    <tr>
      <th>Total Calories</th>
      <th id="total-breakfast-calories"</th>
      <th></th>
    </tr>
    <tr>
      <th>Remaining Calories</th>
      <th id="remaining-breakfast-calories"></th>
      <th></th>
    </tr>`
  )
  $('td#breakfast-item-calories').each(function (index, item) {
    breakfastCalories += parseInt(item.innerHTML)
  })
  $('th#total-breakfast-calories').html(breakfastCalories)
  $('th#remaining-breakfast-calories').html(goalBreakfastCalories - breakfastCalories)
}

const appendCaloriesLunch = () => {
  $('#table-3').append(`
    <tr>
      <th>Total Calories</th>
      <th id="total-lunch-calories"></th>
      <th></th>
    </tr>
    <tr>
      <th>Remaining Calories</th>
      <th id="remaining-lunch-calories"></th>
      <th></th>
    </tr>`
  )
  $('td#lunch-item-calories').each(function (index, item) {
    lunchCalories += parseInt(item.innerHTML)
  })
  $('th#total-lunch-calories').html(lunchCalories)
  $('th#remaining-lunch-calories').html(goalLunchCalories - lunchCalories)
}

const appendCaloriesDinner = () => {
  $('#table-4').append(`
    <tr>
      <th>Total Calories</th>
      <th id="total-dinner-calories"></th>
      <th></th>
    </tr>
    <tr>
      <th>Remaining Calories</th>
      <th id="remaining-dinner-calories"></th>
      <th></th>
    </tr>`
  )
  $('td#dinner-item-calories').each(function (index, item) {
    dinnerCalories += parseInt(item.innerHTML)
  })
  $('th#total-dinner-calories').html(dinnerCalories)
  $('th#remaining-dinner-calories').html(goalDinnerCalories - dinnerCalories)
}

const appendCaloriesSnacks = () => {
  $('#table-2').append(`
    <tr>
      <th>Total Calories</th>
      <th>374</th>
      <th></th>
    </tr>
    <tr>
      <th>Remaining Calories</th>
      <th>26</th>
      <th></th>
    </tr>`
  )
}

const getFoods = () => {
  fetch(`${baseUrl}/api/v1/foods`)
    .then(response => response.json())
    .then(foods => appendFoods(foods))
    .catch(error => console.error({ error }))
}

const appendFoods = (foods) => {
  foods.forEach(food => {
    appendFood(food)
  })
}

const appendFood = (food) => {
  $('#all-foods').append(`
    <tr>
      <td class="checkbox" id=${food.id}><input type="checkbox"></td>
      <td class="name">${food.name}</td>
      <td class="calories">${food.calories}</td>
    </tr>
  `)
}

const calculateCalorieTotals = () => {
  $('#goal-calories').html(goalCalories)
}

const filterFoods = () =>  {
  $('.input-field').on('keyup', function () {
    var value = $(this).val().toLowerCase()
    $('#all-foods tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    })
  })
}

const addFoodsToMeal = (event) => {
  $('#all-foods').find('input[type="checkbox"]:checked').each(function (index, row) {
    let elements = row.parentNode.parentNode.querySelectorAll('td')
    let foodId = elements[0].id
    let foodName = elements[1].innerHTML
    let foodCalories = elements[2].innerHTML
    let mealId = event.target.id
    fetch(`${baseUrl}/api/v1/meals/${mealId}/foods/${foodId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    $(`#table-${mealId} thead`).append(`
      <tr>
        <td>${foodName}</td>
        <td>${foodCalories}</td>
        <td><button type="button" class="remove-food-button" id=${foodId}>Remove</button></td>
      </tr>`)
    $('.checkbox').find('input:checkbox').prop('checked', false)
  })
}

const removeFoodFromMeal = (event) => {
  let tableId = event.target.parentElement.parentElement.parentElement.id
  let mealId = tableId[tableId.length - 1]
  let foodId = event.target.id
  event.target.parentElement.parentElement.remove()
  fetch(`${baseUrl}/api/v1/meals/${mealId}/foods/${foodId}`, {
    method: 'DELETE'
  })
}

$('.add-food-button').click(addFoodsToMeal)
$('.meal-table').on('click', '.remove-food-button', removeFoodFromMeal)

getMeals()
calculateCalorieTotals()
getFoods()
// $(document).ready
