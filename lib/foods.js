const handleResponse = (response) => {
  return response.json()
    .then((json) => {
      if (!response.ok) {
        const error = {
          status: response.status,
          statusText: response.statusText,
          json
        };
        return Promise.reject(error)
      }
      return json
    })
}

const errorLog = (error) => {
  console.error({ error })
}

const getFoods = () => {
  $('#foods').html('')
  fetch('https://fast-meadow-36413.herokuapp.com/api/v1/foods')
    .then(handleResponse)
    .then(getEachFood)
    .catch(errorLog);
};

const getEachFood = (foods) => {
  return foods.forEach((food) => {
    appendFood(food)
  })
}

const appendFood = (food) => {
  $('#foods').append(`
  <tr>
    <td id=${food.id} class="name">${food.name}</td>
    <td id=${food.id} class="calories">${food.calories}</td>
    <td><button type="button" id=${food.id} class="removeFood-btn">Remove</button></td>
    <td><button type="button" id=${food.id} class="showEditForm-btn">Edit</button></td>
  </tr>
  `);
};

const removeFood = (event) => {
  event.target.parentNode.parentNode.remove()
  deleteFood(event.target.id);
};

const deleteFood = (foodId) => {
  fetch(`https://fast-meadow-36413.herokuapp.com/api/v1/foods/${foodId}`, {
    method: 'DELETE'
  })
  .catch(errorLog)
}

const addNewFood = (event) => {
  event.preventDefault();
  let name = $('#nameField').val();
  let calories = $('#caloriesField').val();

  postNewFood({"food": { "name": `${name}`, "calories": `${calories}`}})
  $('#nameField').val('')
  $('#caloriesField').val('');
};

const postNewFood = (newFoodInfo) => {  
  fetch('https://fast-meadow-36413.herokuapp.com/api/v1/foods', newFoodPayload(newFoodInfo))
    .then(handleResponse)
    .then(getFoods)
    .catch(errorLog)
};

const newFoodPayload = (body) => {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }
}

const updateFood = (event) => {
  event.preventDefault();
  let name = $('#editNameField').val();
  let calories = $('#editCaloriesField').val();

  patchFood({"food": { "name": `${name}`, "calories": `${calories}`}})
  resetEditForm();
};

const resetEditForm = () => {
  $('#editNameField').val('')
  $('#editCaloriesField').val('')
  $("#edit-food-form").hide();
}

const patchFood = (editedFoodInfo) => {  
  fetch(`https://fast-meadow-36413.herokuapp.com/api/v1/foods/${foodId}`, editFoodPayload(editedFoodInfo))
    .then(handleResponse)
    .then(getFoods)
    .catch(errorLog)
};

const editFoodPayload = (body) => {
  return {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }
}

const showEditForm = () => {
  foodId = event.target.id
  foodName = $(`.name#${foodId}`).text()
  foodCalories = $(`#${foodId}.calories`).text()
  $('#editNameField').val(foodName)
  $('#editCaloriesField').val(foodCalories)
  $('#editTitle').html(`Edit ${foodName}`)
  $("#edit-food-form").show();
}

getFoods();

let foodId
let foodName
let foodCalories

$('#addFood-btn').on('click', addNewFood);
$('#foods').on('click', '.removeFood-btn', removeFood);
$("#foods").on('click', '.showEditForm-btn', showEditForm);
$('#editFood-btn').on('click', updateFood);
