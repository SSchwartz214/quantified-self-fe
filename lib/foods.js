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
        <td class="name">${food.name}</td>
        <td class="calories">${food.calories}</td>
      </tr>
    `);
  };

  getFoods();