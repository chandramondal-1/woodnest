const products = [
  {
    id: "caffino-l-shape",
    name: "Caffino L Shape",
    category: "L Shape",
    config: "3+2+Corner+2 Round Chair",
    price: "₹99,450",
    size: "L 108 x W 84 D 36 in",
    image: "./assets/products/IMG_1357.PNG",
    badge: "Featured",
    description:
      "A grand living-room composition with a statement corner profile and matching round chairs, designed for large family spaces."
  },
  {
    id: "ss-cedar-pu",
    name: "SS Cedar PU",
    category: "Sofa Sets",
    config: "3+2+1",
    price: "Price on request",
    size: "Catalog size visible on image set",
    image: "./assets/products/IMG_1358.PNG",
    badge: "Classic",
    description:
      "A beige leather-look sofa set with a practical premium silhouette for family homes and reception-style spaces."
  },
  {
    id: "regular-1-seater",
    name: "Regular 1 Seater",
    category: "1 Seater",
    config: "Single Chair",
    price: "₹11,000",
    size: "L 38 x D 36 in",
    image: "./assets/products/IMG_1359.PNG",
    badge: "Compact",
    description:
      "A clean single-seater option for corners, waiting areas, and mix-and-match living room layouts."
  },
  {
    id: "regular-2-seater",
    name: "Regular 2 Seater",
    category: "2 Seater",
    config: "2 Seater Sofa",
    price: "₹22,100",
    size: "L 58 x D 36 in",
    image: "./assets/products/IMG_1360.PNG",
    badge: "Essential",
    description:
      "A straightforward two-seater with soft arms and neutral tone, suited for apartments and smaller living rooms."
  },
  {
    id: "regular-3-seater",
    name: "Regular 3 Seater",
    category: "3 Seater",
    config: "3 Seater Sofa",
    price: "₹33,150",
    size: "L 72 x D 36 in",
    image: "./assets/products/IMG_1361.PNG",
    badge: "Popular",
    description:
      "An everyday three-seater silhouette with warm upholstery and a familiar family-friendly profile."
  },
  {
    id: "bombay-brown-set",
    name: "SS Bombay Brown",
    category: "Sofa Sets",
    config: "3+1+1",
    price: "₹42,900",
    size: "3 seater + 2 single seaters",
    image: "./assets/products/IMG_1362.PNG",
    badge: "Premium Pick",
    description:
      "A rich brown sofa set with rounded arms and a formal lounge feel for executive and classic interiors."
  },
  {
    id: "bombay-1-seater",
    name: "Bombay Brown 1 Seater",
    category: "1 Seater",
    config: "Single Sofa",
    price: "₹7,800",
    size: "L 36 x D 36 in",
    image: "./assets/products/IMG_1363.PNG",
    badge: "Value",
    description:
      "A compact armchair-style single sofa with rounded comfort and a deep brown finish."
  },
  {
    id: "bombay-3-seater",
    name: "Bombay Brown 3 Seater",
    category: "3 Seater",
    config: "3 Seater Sofa",
    price: "₹22,100",
    size: "L 72 x D 36 in",
    image: "./assets/products/IMG_1364.PNG",
    badge: "Classic",
    description:
      "A three-seater in the Bombay family, designed for simple, durable, dark-toned living room styling."
  },
  {
    id: "audi-l-shape",
    name: "SS Audi L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹99,450",
    size: "L 118 x W 104 D 36 in",
    image: "./assets/products/IMG_1365.PNG",
    badge: "Luxury",
    description:
      "A broad modern sectional with integrated side surfaces, warm brown upholstery, and a high-end family lounge character."
  },
  {
    id: "mahal-l-shape",
    name: "SS Mahal L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹88,400",
    size: "L 118 x W 104 D 36 in",
    image: "./assets/products/IMG_1366.PNG",
    badge: "Luxury",
    description:
      "A textured beige sectional with layered cushions and decorative side detailing for upscale homes."
  },
  {
    id: "trendz-l-shape",
    name: "SS Trendz L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹75,400",
    size: "L 118 x W 104 D 36 in",
    image: "./assets/products/IMG_1367.PNG",
    badge: "Modern",
    description:
      "A youthful grey and mustard L-shape design with slim legs and strong contrast styling."
  },
  {
    id: "ss-coral-l-shape",
    name: "SS Coral L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹78,000",
    size: "L 115 x W 96 D 36 in",
    image: "./assets/products/IMG_1368.PNG",
    badge: "Statement",
    description:
      "A quilted charcoal sectional with yellow accent cushions for buyers who want a bold contemporary look."
  },
  {
    id: "apollo-l-shape",
    name: "SS Apollo L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹85,800",
    size: "L 115 x W 96 D 36 in",
    image: "./assets/products/IMG_1369.PNG",
    badge: "Premium",
    description:
      "A dark brown L-shape with stitched diamond details and a formal premium appeal."
  },
  {
    id: "ringo-l-shape",
    name: "SS Ringo L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹96,200",
    size: "L 109 x W 84 D 36 in",
    image: "./assets/products/IMG_1370.PNG",
    badge: "Designer",
    description:
      "A soft beige-and-brown sectional styled with decorative cushions for elevated lounge settings."
  },
  {
    id: "picasso-l-shape",
    name: "SS Picasso L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹83,200",
    size: "L 109 x W 84 D 36 in",
    image: "./assets/products/IMG_1371.PNG",
    badge: "Designer",
    description:
      "A green sectional with a distinctive arm profile and checker-style cushions that feels bold and fashionable."
  },
  {
    id: "mac-l-shape",
    name: "SS Mac L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹88,400",
    size: "L 109 x W 84 D 36 in",
    image: "./assets/products/IMG_1372.PNG",
    badge: "Chesterfield",
    description:
      "A plush tufted sectional with ornate styling for buyers who prefer decorative luxury and rich visual texture."
  },
  {
    id: "kazo-l-shape",
    name: "SS Kazo L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹91,000",
    size: "L 114 x W 90 D 36 in",
    image: "./assets/products/IMG_1373.PNG",
    badge: "Luxury",
    description:
      "A broad tufted sectional in deep brown with sculpted curves and premium gold touches."
  },
  {
    id: "marco-l-shape",
    name: "SS Marco L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹57,200",
    size: "L 108 x W 84 D 36 in",
    image: "./assets/products/IMG_1374.PNG",
    badge: "Best Value",
    description:
      "A streamlined beige sectional with integrated end console details and elegant accent pillows."
  },
  {
    id: "ronald-l-shape",
    name: "SS Ronald L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹57,200",
    size: "L 109 x W 84 D 36 in",
    image: "./assets/products/IMG_1375.PNG",
    badge: "Best Value",
    description:
      "A practical dark sectional with mustard cushions and a compact footprint for modern homes."
  },
  {
    id: "oyster-set",
    name: "SS Oyster",
    category: "Sofa Sets",
    config: "3+2+2",
    price: "₹78,000",
    size: "3 Seater L 90 x D 36 in / 2 Seater L 66 x D 36 in",
    image: "./assets/products/IMG_1376.PNG",
    badge: "Family Set",
    description:
      "A warm textured family sofa arrangement with elegant curved arms and premium trim details."
  },
  {
    id: "jaguar-l-shape",
    name: "Jaguar L Shape",
    category: "L Shape",
    config: "2+1+Corner+1",
    price: "₹70,500",
    size: "L 108 x W 84 D 36 in",
    image: "./assets/products/IMG_1377.PNG",
    badge: "Large Lounge",
    description:
      "A spacious pale blue corner arrangement with deep seating and quilted accent details."
  },
  {
    id: "nova-set",
    name: "Nova",
    category: "Sofa Sets",
    config: "3+1+1",
    price: "₹49,400",
    size: "3 Seater L 90 x D 36 in",
    image: "./assets/products/IMG_1378.PNG",
    badge: "Modern Set",
    description:
      "A maroon sofa set with striped accent cushions, suited for contemporary family interiors."
  },
  {
    id: "jordan-l-shape",
    name: "Jordan L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹83,200",
    size: "L 109 x W 84 D 36 in",
    image: "./assets/products/IMG_1379.PNG",
    badge: "Minimal",
    description:
      "A beige modern corner sofa with a calm neutral presence and clean-lined silhouette."
  },
  {
    id: "bristol-set",
    name: "Bristol",
    category: "Sofa Sets",
    config: "3+1+1",
    price: "₹36,000",
    size: "Catalog dimensions shown on image",
    image: "./assets/products/IMG_1380.PNG",
    badge: "Value Set",
    description:
      "A dark compact sofa set with quilted back detail and a no-fuss contemporary profile."
  },
  {
    id: "bolton-set",
    name: "Bolton",
    category: "Sofa Sets",
    config: "3+1+1",
    price: "₹35,000",
    size: "L 109 x W 84 D 36 in",
    image: "./assets/products/IMG_1381.PNG",
    badge: "Value Set",
    description:
      "A rounded-arm sofa set in muted green tones with an inviting family-room look."
  },
  {
    id: "juniper-set",
    name: "Juniper",
    category: "Sofa Sets",
    config: "3+2+2",
    price: "₹36,000",
    size: "3 Seater L 90 x D 36 in / 2 Seater L 66 x D 36 in",
    image: "./assets/products/IMG_1383.PNG",
    badge: "Family Set",
    description:
      "A practical brown family sofa arrangement with high back cushions and easy everyday styling."
  },
  {
    id: "vegas-set",
    name: "Vegas",
    category: "Sofa Sets",
    config: "3+1+1",
    price: "₹42,500",
    size: "L 108 x W 84 D 36 in",
    image: "./assets/products/IMG_1384.PNG",
    badge: "Contemporary",
    description:
      "A soft rose-toned set with broad arms and plush seating for modern family rooms."
  },
  {
    id: "ontario-set",
    name: "Ontario",
    category: "Sofa Sets",
    config: "3+1+1",
    price: "₹36,000",
    size: "L 109 x W 84 D 36 in",
    image: "./assets/products/IMG_1385.PNG",
    badge: "Wood Accent",
    description:
      "A two-tone sofa set with strong wood-look arms and a structured living room profile."
  },
  {
    id: "cappuccino-l-shape",
    name: "Cappuccino L Shape",
    category: "L Shape",
    config: "Chaise Sectional",
    price: "₹42,500",
    size: "3 Seater + chaise layout",
    image: "./assets/products/IMG_1386.PNG",
    badge: "Minimal",
    description:
      "A calm cappuccino-toned chaise sectional with sleek tapered legs and soft modern lines."
  },
  {
    id: "coral-l-shape",
    name: "Coral L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹75,400",
    size: "L 108 x W 84 D 36 in",
    image: "./assets/products/IMG_1388.PNG",
    badge: "Statement",
    description:
      "A textured blue sectional with matching ottomans and a grounded luxury look."
  },
  {
    id: "mareena-l-shape",
    name: "Mareena L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹58,000",
    size: "Catalog size shown on image",
    image: "./assets/products/IMG_1389.PNG",
    badge: "Decorative",
    description:
      "A purple-toned L-shape with bold multi-cushion styling and matching ottomans."
  },
  {
    id: "lara-plus-set",
    name: "Lara Plus",
    category: "Sofa Sets",
    config: "3+1+1",
    price: "₹48,000",
    size: "3 Seater L 90 x D 36 in / 2 Seater L 66 x D 36 in",
    image: "./assets/products/IMG_1390.PNG",
    badge: "Fresh",
    description:
      "A blue sofa set with printed cushions and a bright, friendly presence."
  },
  {
    id: "carnival-l-shape",
    name: "Carnival L Shape",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹70,500",
    size: "L 108 x W 84 D 36 in",
    image: "./assets/products/IMG_1391.PNG",
    badge: "Featured",
    description:
      "A premium brown sectional with plush channel details and a luxurious showroom-style profile."
  },
  {
    id: "newby-set",
    name: "Newby",
    category: "Sofa Sets",
    config: "3+1+1",
    price: "₹45,600",
    size: "3 Seater L 72 x D 36 in / 1 Seater L 36 x D 36 in",
    image: "./assets/products/IMG_1392.PNG",
    badge: "Office Style",
    description:
      "A black leather-look reception-friendly sofa set with compact proportions and a formal tone."
  },
  {
    id: "el-top-sofa-cum-bed",
    name: "El Top Sofa Cum Bed",
    category: "Sofa Cum Bed",
    config: "L Shape Convertible",
    price: "₹67,600",
    size: "Convertible pull-out format",
    image: "./assets/products/IMG_1393.PNG",
    badge: "Convertible",
    description:
      "A dark convertible sectional that opens into a bed for flexible living and guest use."
  },
  {
    id: "l-couch",
    name: "L Couch",
    category: "L Shape",
    config: "Sectional Set",
    price: "₹60,500",
    size: "L 108 x D 70 in",
    image: "./assets/products/IMG_1394.PNG",
    badge: "Wide Lounge",
    description:
      "A broad two-tone sectional with long seating surfaces and a grounded contemporary form."
  },
  {
    id: "gatsby-set",
    name: "Gatsby",
    category: "Sofa Sets",
    config: "3+1+1",
    price: "₹46,800",
    size: "3 Seater L 72 x D 36 in / 1 Seater L 36 x D 36 in",
    image: "./assets/products/IMG_1395.PNG",
    badge: "Compact Premium",
    description:
      "A dark tailored sofa set with slim legs and a more refined urban look."
  },
  {
    id: "cruise-set",
    name: "Cruise",
    category: "Sofa Sets",
    config: "3+1+1",
    price: "₹46,800",
    size: "3 Seater + 2 single seaters",
    image: "./assets/products/IMG_1396.PNG",
    badge: "Classic",
    description:
      "A rounded black sofa set with a familiar lounge shape and timeless appeal."
  },
  {
    id: "knight-set",
    name: "Knight",
    category: "Sofa Sets",
    config: "3+1+1",
    price: "₹38,400",
    size: "3 Seater L 74 x D 34 in / 1 Seater L 36 x D 34 in",
    image: "./assets/products/IMG_1397.PNG",
    badge: "Formal",
    description:
      "A sleek black sofa set with rounded backs and a formal reception-ready character."
  },
  {
    id: "casper-luxury",
    name: "Casper",
    category: "Luxury Lounge",
    config: "Curved Premium Sectional",
    price: "₹88,400",
    size: "L 111 x B 91 x D 35 in",
    image: "./assets/products/IMG_1398.PNG",
    badge: "Luxury Lounge",
    description:
      "An emerald curved sectional with matching poufs and a dramatic statement look for premium homes."
  },
  {
    id: "dream-on-bed",
    name: "Dream On",
    category: "Sofa Cum Bed",
    config: "Convertible Bed Sofa",
    price: "₹36,000",
    size: "L 74 x D 35 in",
    image: "./assets/products/IMG_1399.PNG",
    badge: "Convertible",
    description:
      "A compact orange click-clack style sofa bed for studio apartments and multifunctional rooms."
  },
  {
    id: "gerena-luxury",
    name: "Gerena",
    category: "Luxury Lounge",
    config: "Premium Sectional Set",
    price: "₹89,000",
    size: "Large sectional layout",
    image: "./assets/products/IMG_1400.PNG",
    badge: "Luxury Lounge",
    description:
      "A richly detailed sectional with sculptural striped arms, matching stools, and a premium centerpiece table."
  },
  {
    id: "planet-l-shape",
    name: "Planet",
    category: "L Shape",
    config: "Compact Sectional",
    price: "₹67,600",
    size: "L 99 x B 79 x D 32 in",
    image: "./assets/products/IMG_1401.PNG",
    badge: "Compact L Shape",
    description:
      "A grey-and-black corner design for smaller homes that still want the sectional experience."
  },
  {
    id: "rocky-chair",
    name: "Rocky",
    category: "Accent Chairs",
    config: "Lounge Chair with Ottoman",
    price: "₹23,000",
    size: "Single lounge seat with footrest",
    image: "./assets/products/IMG_1402.PNG",
    badge: "Accent",
    description:
      "A premium accent chair with matching ottoman, ideal for luxury corners, bedroom seating, or reading nooks."
  }
];

window.WOODNEST_PRODUCTS = products;

const featuredIds = [
  "caffino-l-shape",
  "audi-l-shape",
  "carnival-l-shape",
  "casper-luxury",
  "gerena-luxury",
  "el-top-sofa-cum-bed"
];

const categoryDescriptions = {
  All: "See the full WOODNEST lineup in one premium catalog view.",
  "L Shape": "Sectionals and corner sofas for statement living rooms.",
  "Sofa Sets": "Traditional 3+1+1 and 3+2+2 combinations for full-room furnishing.",
  "1 Seater": "Single seats and compact chairs for corners and lounge additions.",
  "2 Seater": "Two-seater sofas suited for apartments and smaller spaces.",
  "3 Seater": "Straight three-seater options for everyday family living.",
  "Sofa Cum Bed": "Convertible designs that balance comfort and utility.",
  "Luxury Lounge": "High-drama premium pieces built to stand out.",
  "Accent Chairs": "Statement chairs and ottoman sets for accent styling."
};

window.WOODNEST_CATEGORY_DESCRIPTIONS = categoryDescriptions;

let activeCategory = "All";
let activeSearch = "";
const homepageFeaturedIds = [
  "carnival-l-shape",
  "audi-l-shape",
  "casper-luxury",
  "el-top-sofa-cum-bed"
];

const categoryOverview = document.getElementById("categoryOverview");
const featuredProducts = document.getElementById("featuredProducts");
const categoryFilters = document.getElementById("categoryFilters");
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const resultsCount = document.getElementById("resultsCount");

const modal = document.getElementById("productModal");
const closeModalButton = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalConfig = document.getElementById("modalConfig");
const modalPrice = document.getElementById("modalPrice");
const modalSize = document.getElementById("modalSize");
const modalDescription = document.getElementById("modalDescription");

const categories = ["All", ...new Set(products.map((product) => product.category))];
window.WOODNEST_CATEGORIES = categories;

function renderCategoryOverview() {
  const counts = categories
    .filter((category) => category !== "All")
    .map((category) => ({
      category,
      count: products.filter((product) => product.category === category).length
    }));

  categoryOverview.innerHTML = counts
    .map(
      ({ category, count }) => `
        <button class="collection-card" data-category-jump="${category}">
          <strong>${category}</strong>
          <p>${categoryDescriptions[category] || "Premium designs collected for faster browsing."}</p>
          <span>${count} products</span>
        </button>
      `
    )
    .join("");
}

function renderFeaturedProducts() {
  const featured = products.filter((product) => featuredIds.includes(product.id));

  featuredProducts.innerHTML = featured
    .map(
      (product) => `
        <article class="featured-card">
          <a class="featured-link" href="./product.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}" />
          </a>
          <div class="featured-copy">
            <div class="meta-row">
              <span class="product-category">${product.category}</span>
              <strong class="product-price">${product.price}</strong>
            </div>
            <strong><a class="title-link" href="./product.html?id=${product.id}">${product.name}</a></strong>
            <p>${product.description}</p>
          </div>
        </article>
      `
    )
    .join("");
}

function renderHomeProducts() {
  const homeProductGrid = document.getElementById("homeProductGrid");

  if (!homeProductGrid) return;

  const selected = products.filter((product) => homepageFeaturedIds.includes(product.id));

  homeProductGrid.innerHTML = selected
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
            <div class="product-actions">
              <a class="btn-consult product-link" href="./consultant.html?product=${encodeURIComponent(product.name)}&source=home-product">Get Consultant</a>
              <a class="btn-dark product-link" href="./product.html?id=${product.id}">View Product</a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function renderCategoryFilters() {
  if (!categoryFilters) return;
  categoryFilters.innerHTML = categories
    .map(
      (category) => `
        <button class="filter-chip ${category === activeCategory ? "active" : ""}" data-category="${category}">
          ${category}
        </button>
      `
    )
    .join("");
}

function getFilteredProducts() {
  return products.filter((product) => {
    const matchesCategory = activeCategory === "All" || product.category === activeCategory;
    const normalizedSearch = activeSearch.trim().toLowerCase();
    const matchesSearch =
      normalizedSearch.length === 0 ||
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch) ||
      product.config.toLowerCase().includes(normalizedSearch);

    return matchesCategory && matchesSearch;
  });
}

function renderProducts() {
  if (!resultsCount || !productGrid) return;
  const filtered = getFilteredProducts();

  resultsCount.textContent = `${filtered.length} product${filtered.length === 1 ? "" : "s"} shown${
    activeCategory === "All" ? "" : ` in ${activeCategory}`
  }`;

  productGrid.innerHTML = filtered
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
              <button class="btn-outline" data-category="${product.category}">Similar</button>
              <a class="btn-consult product-link" href="./consultant.html?product=${encodeURIComponent(product.name)}&source=shop-product">Get Consultant</a>
              <a class="btn-dark product-link" href="./product.html?id=${product.id}">View Details</a>
            </div>
          </div>
        </article>
      `
    )
    .join("");
}

function applyInitialCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const categoryParam = params.get("category");

  if (categoryParam && categories.includes(categoryParam)) {
    activeCategory = categoryParam;
  }
}

function openModal(productId) {
  const product = products.find((item) => item.id === productId);

  if (!product) return;

  modalImage.src = product.image;
  modalImage.alt = product.name;
  modalCategory.textContent = product.category;
  modalTitle.textContent = product.name;
  modalConfig.textContent = product.config;
  modalPrice.textContent = product.price;
  modalSize.textContent = `Size: ${product.size}`;
  modalDescription.textContent = product.description;

  modal.classList.remove("hidden");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hidden");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;

  if (target.dataset.category && categoryFilters && productGrid) {
    activeCategory = target.dataset.category;
    renderCategoryFilters();
    renderProducts();
  }

  if (target.dataset.categoryJump && categoryFilters && productGrid) {
    activeCategory = target.dataset.categoryJump;
    renderCategoryFilters();
    renderProducts();
    document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (target.dataset.productId && modal && modalImage) {
    openModal(target.dataset.productId);
  }

  if (target.dataset.closeModal === "true") {
    closeModal();
  }
});

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    if (!(event.target instanceof HTMLInputElement)) return;

    activeSearch = event.target.value;
    renderProducts();
  });
}

if (closeModalButton) {
  closeModalButton.addEventListener("click", closeModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

applyInitialCategoryFromUrl();

if (categoryOverview) {
  renderCategoryOverview();
}

if (featuredProducts) {
  renderFeaturedProducts();
}

renderHomeProducts();

if (categoryFilters && productGrid && resultsCount) {
  renderCategoryFilters();
  renderProducts();
}
