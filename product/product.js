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

const displayProduct = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    const product = products.find((prod) => prod.id == getQueryString());
    const productSection = document.getElementById("product-section");

    //Display the product
    productSection.innerHTML += `
    <div id="image-cta">
      <img id="main-product-image" src='${product.image}'/>
      <br/>
      
      <p>${product.description}</p>
      <p>GHS ${product.price}</p>
      </div>
      `;

    // Titles
    const titleText = document.querySelector("#title-text");
    const title = product.title;
    titleText.textContent =
      title.length > 40 ? title.substring(0, 40) + " ..." : title;
    const fulltitle = document.querySelector("#full-title");
    fulltitle.textContent = title;

    //Category page link
    const categoryLinkEl = document.getElementById("product-category-link");
    categoryLinkEl.textContent = product.category + " > ";
    setHrefById(
      "product-category-link",
      "/category/index.html?query=" + product.category
    );
  } catch (error) {
    console.log("err", error);
  }
};

displayProduct();

function setHrefById(elementId, hrefValue) {
  const element = document.getElementById(elementId);
  if (element) {
    element.href = hrefValue;
  } else {
    console.error(`Element with ID "${elementId}" not found.`);
  }
}
