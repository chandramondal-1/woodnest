const pageProducts = window.WOODNEST_PRODUCTS || [];

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const selectedProduct = pageProducts.find((product) => product.id === productId) || pageProducts[0];

const detailImage = document.getElementById("detailImage");
const detailCategory = document.getElementById("detailCategory");
const detailTitle = document.getElementById("detailTitle");
const detailConfig = document.getElementById("detailConfig");
const detailPrice = document.getElementById("detailPrice");
const detailBadge = document.getElementById("detailBadge");
const detailDescription = document.getElementById("detailDescription");
const detailMetaConfig = document.getElementById("detailMetaConfig");
const detailMetaCategory = document.getElementById("detailMetaCategory");
const detailSize = document.getElementById("detailSize");
const detailOverviewText = document.getElementById("detailOverviewText");
const detailWhatsApp = document.getElementById("detailWhatsApp");
const detailConsultant = document.getElementById("detailConsultant");
const relatedProducts = document.getElementById("relatedProducts");

if (selectedProduct) {
  document.title = `WOODNEST | ${selectedProduct.name}`;
  detailImage.src = selectedProduct.image;
  detailImage.alt = selectedProduct.name;
  detailCategory.textContent = selectedProduct.category;
  detailTitle.textContent = selectedProduct.name;
  detailConfig.textContent = selectedProduct.config;
  detailPrice.textContent = selectedProduct.price;
  detailBadge.textContent = selectedProduct.badge;
  detailDescription.textContent = selectedProduct.description;
  detailMetaConfig.textContent = selectedProduct.config;
  detailMetaCategory.textContent = selectedProduct.category;
  detailSize.textContent = selectedProduct.size;
  detailOverviewText.textContent = `${selectedProduct.name} brings ${selectedProduct.badge.toLowerCase()} appeal to the ${selectedProduct.category.toLowerCase()} collection. This page gives each product its own proper viewing space, which feels more premium than showing everything only inside one catalog grid.`;
  detailWhatsApp.href = `https://wa.me/919832477151?text=${encodeURIComponent(`Hi, I'm interested in the ${selectedProduct.name} (${selectedProduct.price}). Please share more details.`)}`;
  if (detailConsultant) {
    detailConsultant.href = `./consultant.html?product=${encodeURIComponent(selectedProduct.name)}&source=detail-page`;
  }

  const related = pageProducts
    .filter(
      (product) =>
        product.category === selectedProduct.category && product.id !== selectedProduct.id
    )
    .slice(0, 3);

  relatedProducts.innerHTML = related
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-image-wrap">
            <img src="${product.image}" alt="${product.name}" />
            <span class="product-badge">${product.badge}</span>
          </div>
          <div class="product-copy">
            <span class="product-category">${product.category}</span>
            <h3>${product.name}</h3>
            <div class="product-meta">
              <span class="product-config">${product.config}</span>
              <strong class="product-price">${product.price}</strong>
            </div>
            <p>${product.description}</p>
            <p class="product-size"><strong>Size:</strong> ${product.size}</p>
            <div class="product-actions">
              <a class="btn-consult product-link" href="./consultant.html?product=${encodeURIComponent(product.name)}&source=related-product">Get Consultant</a>
              <a class="btn-dark product-link" href="./product.html?id=${product.id}">Open Inner Page</a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}
