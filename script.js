function loadCategories() {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
}

function displayCategories(categories) {
  const container = document.getElementById('category-container')
  container.innerHTML = ''

  const allBtn = document.createElement('div')
  allBtn.innerHTML = `
     <button onclick="loadAllPlants(false)" 
      class="w-full text-left font-normal px-4 py-2 rounded-lg  hover:bg-[#15803D] hover:text-white transition">
       All Trees
    </button>
  `
  container.appendChild(allBtn)

  categories.forEach((category) => {
    const div = document.createElement('div')
    div.innerHTML = `
      <button onclick="loadPlantsByCategory(${category.id})"
        class="w-full text-left font-normal px-4 py-2 rounded-lg  hover:bg-[#15803D] hover:text-white transition">
         ${category.category_name}
      </button>
    `
    container.appendChild(div)
  })
}

function loadAllPlants(limit = true) {
  fetch('https://openapi.programming-hero.com/api/plants')
    .then((res) => res.json())
    .then((data) => {
      if (limit) {
        displayCards(data.plants.slice(0, 9))
      } else {
        displayCards(data.plants)
      }
    })
}

function loadPlantsByCategory(id) {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      displayCards(data.plants)
    })
}

function displayCards(plants) {
  const container = document.getElementById('trees-card-container')
  container.innerHTML = ''

  if (!plants || plants.length === 0) {
    container.innerHTML = `
      <p class="text-center text-xl text-gray-500 col-span-full">
        No plants found in this category 🌱
      </p>
    `
    return
  }

  plants.forEach((plant) => {
    const card = document.createElement('div')
    card.classList.add(
      'rounded-lg',
      'p-4',
      'shadow-lg',
      'hover:shadow-xl',
      'transition',
      'flex',
      'flex-col',
      'justify-between',
      'h-[370px]'
    )

    card.innerHTML = `
      <div>
      <div>
        <img src="${plant.image}" alt="${plant.name}" 
             class="w-full h-40 object-cover rounded-lg"/>
        <h3 onclick="loadPlantDetail(${plant.id})"
            class="text-lg font-bold cursor-pointer hover:text-green-600 transition mt-2">
          ${plant.name}
        </h3>
        <p class="text-sm text-gray-600">
          ${
            plant.description
              ? plant.description.slice(0, 80)
              : 'No description available'
          }...
        </p>
      </div>

      <div>
        <div class="flex justify-between items-center mt-3">
          <p class="text-sm font-medium text-green-700 bg-[#DCFCE7] rounded-xl px-3 py-1"> 
            ${plant.category}
          </p>
          <p class="text-sm font-semibold">৳ ${plant.price}</p>
        </div>
        <button onclick="addToCart(${plant.id},'${plant.name}',${plant.price})"
          class="btn w-full bg-[#15803D] text-white rounded-full border-none hover:bg-white hover:text-green-700 transition mt-3">
          Add to Cart
        </button>
      </div>
      </div>
    `
    container.appendChild(card)
  })
}

function loadPlantDetail(id) {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((plant) => {
      alert(` ${plant.name}\n\n${plant.description}`)
    })
}

function addToCart(id, name, price) {
  alert(`✅ Added "${name}" to cart (৳${price})`)
}

loadCategories()
loadAllPlants(true)
