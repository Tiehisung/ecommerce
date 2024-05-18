const categoriesCta = document.getElementById("categories-container");

async function getAllCategories() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const categories = await response.json();
    //Reset query string with this link
    categoriesCta.innerHTML += `<a href='/index.html?query=' class='category-link'>All</a>`;
    //Append links with corresponding query strings
    categories.map((category, catIndex) => {
      categoriesCta.innerHTML += `<a href='/index.html?query=${catIndex}' class='category-link'>${category}</a>`;
    });
    //Set categories to local store
    localStorage.setItem("categories", JSON.stringify(categories));
  } catch (error) {
    console.log(error);
  }
}

getAllCategories();
//Get categories from local storage
const categoriesLS = JSON.parse(localStorage.getItem("categories"));
const productsContainer = document.getElementById("products-container");

//Get query string specifying filter type
const getQueryString = () => {
  // Get the current URL with the query string
  const url = window.location.href;
  const queries = url.split("?")[1];
  // Create a URLSearchParams object from the URL
  const searchParams = new URLSearchParams(queries);

  // Get the value of a specific parameter
  const query = searchParams.get("query");

  // Check if a parameter exists
  return query;
};

const displayProducts = async () => {
  try {
    let url = "https://fakestoreapi.com/products";
    console.log("c", categoriesLS);
    const categoryIndex = parseInt(getQueryString("query"));
    const filterCategory = categoriesLS[categoryIndex];
    if (filterCategory) {
      url = url + "/category/" + filterCategory;
    }

    const response = await fetch(url);
    const products = await response.json();

    products.map((product) => {
      productsContainer.innerHTML += `<div class='product-cta'> 
      
      <img src="${product.image}" />

      <div class="product-text-cta">
        <p>${product.title}</p>
        </div>
        <div id="price-and-seemore">
         <h6 class="price">GHS ${product.price} </h6>
         <a href="./product/index.html?query=${product.id}">See more</a>
        </div>
      
      </div>`;
    });
  } catch (error) {
    console.log(error);
  }
};

displayProducts();

function setHrefById(elementId, hrefValue) {
  const element = document.getElementById(elementId);
  if (element) {
    element.href = hrefValue;
  } else {
    console.error(`Element with ID "${elementId}" not found.`);
  }
}

