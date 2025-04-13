// landing.js

// Аналог данных из вашего React-примера
const products1 = [
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

const products = [
  {
    id: "knt-1",
    name: "КНТ-1",
    description: "Огнезащитная терморасширяющаяся краска для металлических конструкций, создающая теплоизолирующий слой при высоких температурах.",
    benefits: [
      "Срок службы покрытия — до 20 лет",
      "Вспучивание при температуре от +200°C",
      "Экологически чистая (без ЛОС)",
      "Применение внутри помещений и под навесом",
    ],
    image: "/static/images/placeholder.jpg",
  },
  {
    id: "knt-2",
    name: "КНТ-2",
    description: "Огнезащитный толстослойный состав для металлоконструкций, подходящий для открытой атмосферы и среднеагрессивных сред.",
    benefits: [
      "До 3 группы огнезащитной эффективности",
      "Работает в открытой атмосфере и помещениях",
      "Срок службы покрытия — до 15 лет",
      "Не требует дополнительной защиты при благоприятных условиях",
    ],
    image: "/static/images/placeholder2.jpg",
  },
  {
    id: "knt-3-ld",
    name: "КНТ-3 (ЛД)",
    description: "Огнебиозащитный износостойкий лак на эпоксидной основе для ЛДСП, ЛДВП, ЛМДФ и других деревянных поверхностей.",
    benefits: [
      "Обеспечивает 1 группу огнезащитной эффективности",
      "Прозрачная полуматовая поверхность",
      "Износостойкость и биозащита",
      "Срок службы — до 10 лет",
    ],
    image: "/static/images/placeholder4.jpg",
  },
  {
    id: "knt-4",
    name: "КНТ-4",
    description: "Атмосферостойкая огнезащитная краска для металлических конструкций, устойчивая к воздействию среды и высоких температур.",
    benefits: [
      "Применяется внутри и снаружи помещений",
      "Теплоизолирующий эффект за счёт вспучивания",
      "Подходит для условий средней агрессии",
      "Срок службы покрытия — до 20 лет",
    ],
    image: "/static/images/placeholder3.jpg",
  },
  {
    id: "knt-cable",
    name: "КНТ-Кабель",
    description: "Огнезащитный состав для кабелей и кабельных конструкций, предотвращающий распространение огня и короткое замыкание.",
    benefits: [
      "Подходит для всех типов кабелей и лотков",
      "Нельзя разбавлять — полностью готов к использованию",
      "Срок службы — до 20 лет",
      "Подходит для наружного и внутреннего применения",
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
	descEl.innerHTML = selectedProduct.description.replace(/\n/g, "<br>");
  
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
  