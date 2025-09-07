const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/categories')
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      displayCategories(json.categories);
    });
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById('category-container');
  categoryContainer.innerHTML = '';

  for (let category of categories) {
    const categoryDiv = document.createElement('div');

    categoryDiv.innerHTML = `
    <button id="category-btn-${category.category_id}" 
      onclick="loadCategoryDetails('${category.category_id}')"
      class="w-full text-left font-normal px-4 rounded-lg hover:bg-[#15803D] hover:text-white transition">
       ${category.category_name}
    </button>
    `;
    categoryContainer.appendChild(categoryDiv);
  }
};

loadCategories();
