// landing.js

// Аналог данных из вашего React-примера
const products = [
	{
	  id: "fire-collars",
	  name: "Fire Collars",
	  description:
		"High-performance fire collars designed to prevent the spread of fire through wall and floor penetrations.",
	  benefits: [
		"Up to 4 hours fire resistance",
		"Easy installation",
		"Suitable for plastic and metal pipes",
		"Complies with international fire safety standards",
	  ],
	  image: "/static/images/placeholder.jpg", // или ваша реальная картинка
	},
	{
	  id: "cable-penetrations",
	  name: "Cable Penetrations",
	  description:
		"Specialized sealing systems for cable penetrations through fire-rated walls and floors.",
	  benefits: [
		"Maintains integrity of fire compartments",
		"Accommodates multiple cables",
		"Retrofittable solution",
		"Tested to international standards",
	  ],
	  image: "/static/images/placeholder2.jpg",
	},
	{
	  id: "fireproof-sealants",
	  name: "Fireproof Sealants",
	  description:
		"High-temperature resistant sealants for sealing joints and gaps in fire-rated constructions.",
	  benefits: [
		"Excellent adhesion to most building materials",
		"Remains flexible after curing",
		"Smoke and gas tight",
		"Water resistant",
	  ],
	  image: "/static/images/placeholder3.jpg",
	},
	{
	  id: "fireproof-varnishes",
	  name: "Fireproof Varnishes",
	  description:
		"Intumescent varnishes that provide fire protection for wooden surfaces and structures.",
	  benefits: [
		"Transparent finish preserves natural appearance",
		"Expands when exposed to heat",
		"Creates insulating char layer",
		"Easy application by brush, roller or spray",
	  ],
	  image: "/static/images/placeholder4.jpg",
	},
	{
	  id: "fireproof-paints",
	  name: "Fireproof Paints",
	  description:
		"Intumescent and ablative paints for structural steel, wood, and other substrates requiring fire protection.",
	  benefits: [
		"Extends evacuation time during fire",
		"Prevents structural collapse",
		"Available in various colors",
		"Low VOC formulations available",
	  ],
	  image: "/static/images/placeholder5.jpg",
	},
  ];
  
  // Храним текущий выбранный продукт (по умолчанию – первый)
  let selectedProduct = products[0];
  
  // Функция для отрисовки сайдбара
  function renderSidebar() {
	const sidebarList = document.getElementById("productSidebar");
	if (!sidebarList) return;
  
	// Очищаем список
	sidebarList.innerHTML = "";
  
	products.forEach((product) => {
	  // Создаём элемент списка
	  const li = document.createElement("li");
	  li.classList.add("list-group-item", "product-item");
  
	  // Если продукт активен, добавляем класс active
	  if (product.id === selectedProduct.id) {
		li.classList.add("active");
	  }
  
	  // Задаём data-атрибут, чтобы знать, какой продукт привязан
	  li.setAttribute("data-product-id", product.id);
  
	  // Иконка (Flame) или любая другая – меняйте на своё усмотрение
	  const icon = document.createElement("i");
	  icon.classList.add("bi", "bi-fire", "me-2", "text-danger");
  
	  li.appendChild(icon);
	  li.appendChild(document.createTextNode(product.name));
  
	  // При клике – выбрать продукт
	  li.addEventListener("click", () => {
		selectProduct(product.id);
	  });
  
	  sidebarList.appendChild(li);
	});
  }
  
  // Функция переключения выбранного продукта
  function selectProduct(productId) {
	const newSelected = products.find((p) => p.id === productId);
	if (!newSelected) return;
  
	selectedProduct = newSelected;
	// Обновляем видимый контент
	updateProductContent();
	// Обновляем классы в сайдбаре
	renderSidebar();
  }
  
  // Функция, которая подставляет данные выбранного продукта
  function updateProductContent() {
	const nameEl = document.getElementById("productName");
	const descEl = document.getElementById("productDescription");
	const benefitsEl = document.getElementById("productBenefits");
	const imageEl = document.getElementById("productImage");
  
	if (!nameEl || !descEl || !benefitsEl || !imageEl) return;
  
	// Название и описание
	nameEl.textContent = selectedProduct.name;
	descEl.textContent = selectedProduct.description;
  
	// Список преимуществ
	benefitsEl.innerHTML = "";
	selectedProduct.benefits.forEach((benefit) => {
	  const li = document.createElement("li");
	  li.innerHTML = `<i class="bi bi-chevron-right text-danger me-1"></i>${benefit}`;
	  benefitsEl.appendChild(li);
	});
  
	// Картинка
	imageEl.src = selectedProduct.image;
	imageEl.alt = selectedProduct.name;
  }
  
  // При загрузке страницы сразу всё инициализируем
  document.addEventListener("DOMContentLoaded", () => {
	// Рендерим пункты сайдбара
	renderSidebar();
	// Обновляем контент
	updateProductContent();
  });
  