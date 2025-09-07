const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then((response) => response.json())
    .then((json) => {
      displayCategories(json.categories)
    })
}

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById('category-container')
  categoryContainer.innerHTML = ''

  const allCategoryDiv = document.createElement('div')
  allCategoryDiv.innerHTML = `
  <button id="allCategory-btn"
  onclick="loadAllCategoryDetails()"
  class="w-full text-left font-normal px-4 rounded-lg hover:bg-[#15803D] hover:text-white transition"
  >
  All Trees
  </button>
  `
  categoryContainer.appendChild(allCategoryDiv)

  for (let category of categories) {
    const categoryDiv = document.createElement('div')

    categoryDiv.innerHTML = `
    <button id="category-btn-${category.category_id}" 
      onclick="loadCategoryDetails('${category.category_id}')"
      class="w-full text-left font-normal px-4 rounded-lg hover:bg-[#15803D] hover:text-white transition">
       ${category.category_name}
    </button>
    `
    categoryContainer.appendChild(categoryDiv)
  }
}

const loadAllCategoryDetails = () => {
  fetch('https://openapi.programming-hero.com/api/plants')
    .then((response) => response.json())
    .then((json) => {
      // console.log(json)
      displayCards(json.data)
    })
}

const loadCategoryDetails = (categoryId) => {
  fetch('https://openapi.programming-hero.com/api/plants')
    .then((response) => response.json())
    .then((json) => {
      if (!json.data || json.data.length === 0) {
        displayCards([])
        return
      }
      const filteredPlants = []
      for (let plant of json.data) {
        if (plant.category_id === Number(categoryId)) {
          filteredPlants.push(plant)
        }
      }
      displayCards(filteredPlants)
    })
}

const displayCards = (plants) => {
  const cardContainer = document.getElementById('trees-card-container')
  cardContainer.innerHTML = ''

  if (!plants || plants.length === 0) {
    cardContainer.innerHTML = `
    <p class="text-center text-xl text-gray-500 col-span-full">
    No plants found in this Category.
    </p>
    `
    return
  }
  for (let plant of plants) {
    const card = document.createElement('div')
    card.classList.add(
      'border',
      'rounded-lg',
      'p-4',
      'shadow-lg',
      'hover:shadow-xl',
      'transition'
    )
    card.innerHTML = `
    <img src="${plant.image}" alt="${
      plant.name
    }" class="w-full h-40 object-cover rounded-lg"/>
    <h3 onclick="loadTreeDetails('${
      plant.id
    }')" class="text-lg font-bold cursor-pointer hover:text-green-600 transition">
      ${plant.name}
    </h3>
    <p class="text-sm text-grey-600">${plant.description.slice(0, 100)}...</p>
    <p class="text-sm font-medium text-green-700">Category: ${
      plant.category
    }</p>
    <p class="text-sm font-semibold">Price: ${plant.price}</p>
    <button onclick="addToCart('${plant.id}', '${plant.name}', '${
      plant.price
    }')" class="btn bg-[#FACC15] text-[#15803D] rounded-full border-none hover:bg-green-400 hover:text-white transition mt-2 px-4 py-2">
      Add to Cart
    </button>
    `
    cardContainer.appendChild(card)
  }
}
loadCategories()
