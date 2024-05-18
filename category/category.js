const getQueryString = () => {
  // Get the current URL with the query string
  const url = window.location.href;
  const queries = url.split("?")[1];
  // Create a URLSearchParams object from the URL
  const params = new URLSearchParams(queries);

  // Get the value of a specific parameter
  const value = params.get("query");

  // Check if a parameter exists
  return value;
};
const categoryTitleEl = document.getElementById("category-main-title");
const productsContainer = document.getElementById("products-container");

const getCategoryProducts = async () => {
  try {
    //Retrieve category name
    const category = getQueryString();
    const response = await fetch(
      "https://fakestoreapi.com/products/category/" + category
    );
    const products = await response.json();
    products.map((product) => {
      productsContainer.innerHTML += `<div class='product-cta'>  
      <img src="${product.image}" />
      <div class="product-text-cta">
        <p>${product.title}</p>
        </div>
        <div id="price-and-seemore">
         <h6 class="price">GHS ${product.price} </h6>
         <a href="/product/index.html?query=${product.id}">See more</a>
        </div>
      
      </div>`;
    });

    // Title
    categoryTitleEl.innerText = category+" products";
  } catch (error) {
    console.log(error);
  }
};

getCategoryProducts();
