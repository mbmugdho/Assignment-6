let cart = []
let total = 0

function toggleLoading(show) {
  const spinner = document.getElementById('loading-spinner')
  const cardContainer = document.getElementById('trees-card-container')

  if (!spinner || !cardContainer) return 

  if (show) {
    spinner.classList.remove('hidden')
    cardContainer.classList.add('hidden')
  } else {
    spinner.classList.add('hidden')
    cardContainer.classList.remove('hidden')
  }
}

function setActiveButton(activeId) {
  const allBtns = document.querySelectorAll('.category-btn')
  allBtns.forEach((btn) => {
    btn.classList.remove('bg-[#15803D]', 'text-white')
    btn.classList.add('bg-white', 'text-green-700')
  })

  const activeBtn = document.getElementById(activeId)
  if (activeBtn) {
    activeBtn.classList.remove('bg-white', 'text-green-700')
    activeBtn.classList.add('bg-[#15803D]', 'text-white')
  }
}

function loadCategories() {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.data || data.categories)) 
}

function displayCategories(categories) {
  const container = document.getElementById('category-container')
  container.innerHTML =
    '<div class="text-center lg:text-left text-xl font-bold ml-3 mb-4">Categories</div>'

  const allBtn = document.createElement('div')
  allBtn.innerHTML = `
    <button id="category-all" onclick="loadAllPlants(false, 'category-all')" 
      class="category-btn w-full text-center lg:text-left font-normal px-4 py-2 rounded-lg bg-white text-green-700 hover:bg-[#15803D] hover:text-white transition">
      All Trees
    </button>
  `
  container.appendChild(allBtn)

  categories.forEach((category) => {
    const div = document.createElement('div')
    div.innerHTML = `
      <button id="category-${category.id}" 
        onclick="loadPlantsByCategory(${category.id}, 'category-${category.id}')"
        class="category-btn w-full text-center lg:text-left font-normal px-4 py-2 rounded-lg bg-white  text-green-700 hover:bg-[#15803D] hover:text-white transition">
         ${category.category_name}
      </button>
    `
    container.appendChild(div)
  })
}

function loadAllPlants(limit = true, btnId = null) {
  toggleLoading(true)

  fetch('https://openapi.programming-hero.com/api/plants')
    .then((res) => res.json())
    .then((data) => {
      displayCards(limit ? data.plants.slice(0, 6) : data.plants) 
    })
    .finally(() => toggleLoading(false)) // 
    .then(() => {
      if (btnId) setActiveButton(btnId)
    })
}


function loadPlantsByCategory(categoryId, btnId = null) {
  toggleLoading(true)

  fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
      displayCards(data.plants || []) 
    })
    .finally(() => toggleLoading(false)) 
    .then(() => {
      if (btnId) setActiveButton(btnId)
    })
}


function displayCards(plants) {
  const container = document.getElementById('trees-card-container')
  container.innerHTML = ''

  if (!plants || plants.length === 0) {
    container.innerHTML = `
      <p class="text-center text-xl text-gray-500 col-span-full">
        No plants found in this category.
      </p>
    `
    return
  }

  plants.forEach((plant) => {
    const card = document.createElement('div')
    card.classList.add(
      'bg-white',
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
        <button onclick="addToCart(${plant.id}, '${plant.name}', ${
      plant.price
    })"
          class="btn w-full bg-[#15803D] text-white rounded-full border-none hover:bg-white hover:text-green-700 transition mt-3">
          Add to Cart
        </button>
      </div>
    `
    container.appendChild(card)
  })
}


function loadPlantDetail(id) {
  fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then((res) => res.json())
    .then((data) => {
      if (!data || !data.plants) {
        
        return
      }

      const plant = data.plants 
      const modal = document.getElementById('my_modal_4')
      if (!modal) {
        console.error('Modal element not found')
        return
      }

      const modalBox = modal.querySelector('.modal-box')
      modalBox.innerHTML = `
        <h3 class="text-lg font-bold">${plant.name}</h3>
        <img src="${plant.image}" alt="${plant.name}" class="w-full h-48 object-cover rounded-lg my-3"/>
        <p class="py-2">${plant.description}</p>
        <p class="font-semibold">Category: ${plant.category}</p>
        <p class="font-semibold">Price: ৳ ${plant.price}</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      `

      modal.showModal() 
    })
    .catch((err) => console.error(err))
}

function addToCart(id, name, price) {
  const existingItem = cart.find((item) => item.id === id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ id, name, price, quantity: 1 })
  }

  total += parseInt(price)
  renderCart()
}

function renderCart() {
  const cartList = document.getElementById('cart-items-list')
  const cartTotal = document.getElementById('cart-total')

  cartList.innerHTML = ''

  cart.forEach((item, index) => {
    const li = document.createElement('li')
    li.classList.add(
      'flex',
      'justify-between',
      'items-center',
      'bg-gray-100',
      'p-2',
      'rounded'
    )

    li.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <button onclick="removeFromCart(${index})" class="text-red-500 font-bold">❌</button>
    `

    cartList.appendChild(li)
  })

  cartTotal.innerText = total
}

function removeFromCart(index) {
  const item = cart[index]
  total -= item.price * item.quantity
  cart.splice(index, 1)
  renderCart()
}

const form = document.querySelector('#plant form')
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    alert('Thank you for your donation.')
    form.reset()
  })
}

  loadCategories()
  loadAllPlants(true, 'category-all')
