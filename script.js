document.getElementById('error2').style.display = 'none'
const searchFood = () => {
  document.getElementById('error2').style.display = 'none'
  document.getElementById('error').style.display = 'none'

  const cardRow = document.getElementById('display')
  cardRow.textContent = ''

  const searchinput = document.getElementById('search-input')

  const searchText = searchinput.value

  if (searchText == '') {
    document.getElementById('error2').style.display = 'block'
    document.getElementById('error').style.display = 'none'

    const detailsDiv = document.getElementById('details')
    detailsDiv.innerHTML = ''

    const cardRow = document.getElementById('display')
    cardRow.textContent = ''

    const defaultCard = document.getElementById('default')
    defaultCard.textContent = ''
  } else {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
      .then((res) => res.json())
      .then((data) => displayFood(data.meals))
    searchinput.value = ''
    const detailsDiv = document.getElementById('details')
    detailsDiv.innerHTML = ''
  }
}
// ----------------default-----------------
fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  .then((res) => res.json())
  .then((data) => defaultFood(data.categories))

const defaultFood = (id) => {
  const defaultCard = document.getElementById('default')
  id.forEach((foodie) => {
    const div = document.createElement('div')
    div.classList.add('col')
    div.innerHTML = `
              <div onclick="loadFoodbyCategories(${
                foodie.strCategory
              })" class="card">

                <img src="${
                  foodie.strCategoryThumb
                }" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${foodie.strCategory}</h5>
                  <p class="card-text">${foodie.strCategoryDescription.slice(
                    0,
                    50
                  )}.......</p>
                  <button  type="button" class="w-100 btn btn-outline-primary">show Details</button>
                </div>
          </div>
    `
    defaultCard.appendChild(div)
  })
}
// -----------------default------------
const loadFoodbyCategories = (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`

  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data))
}
// ------------------display----------------

document.getElementById('error').style.display = 'none'

const displayFood = (foods) => {
  const cardRow = document.getElementById('display')

  if (foods == null || foods.lenghth == -1) {
    document.getElementById('error').style.display = 'block'
    document.getElementById('error2').style.display = 'none'

    const detailsDiv = document.getElementById('details')
    detailsDiv.innerHTML = ''

    cardRow.textContent = ''
    const defaultCard = document.getElementById('default')

    defaultCard.textContent = ''
  } else {
    foods.forEach((food) => {
      const defaultCard = document.getElementById('default')
      defaultCard.textContent = ''

      const div = document.createElement('div')
      div.classList.add('col')
      div.innerHTML = `
              <div onclick="loadSingleFoodDetails(${food.idMeal})" class="card">
                <img src="${food.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${food.strMeal}</h5>
                  <p class="card-text">${food.strInstructions.slice(
                    0,
                    200
                  )}.......</p>
                  <button type="button" class="w-100 btn btn-outline-primary">Show Details</button>
                </div>
              </div>
      `
      cardRow.appendChild(div)
    })
  }
}
// ------------------display--------------
// ---------------------singlefooddetailsdisplay------------------
const loadSingleFoodDetails = (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  fetch(url)
    .then((res) => res.json())
    .then((data) => showSingleFoodDetails(data.meals[0]))
}

const showSingleFoodDetails = (food) => {
  const detailsDiv = document.getElementById('details')
  detailsDiv.innerHTML = ''
  const Div = document.createElement('div')
  Div.classList.add('col')
  Div.innerHTML = `
  <div onclick="loadSingleFoodDetails(${food.idMeal})" class="card">
    <img src="${food.strMealThumb}" class="img-top " alt="...">
    <div class="card-body">
      <h5 class="card-title">${food.strMeal} (${food.strCategory})</h5>
      <p class="card-text">${food.strInstructions}</p>
      <button type="button" class="w-100 btn btn-outline-primary">YouTube</button>
    </div>
  </div>
`
  detailsDiv.appendChild(Div)
}
// ---------------------singlefooddetailsdisplay------------------
