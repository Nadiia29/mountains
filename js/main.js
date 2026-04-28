const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');

// Функція закриття меню
function closeMenu() {
	nav.classList.remove('nav-active');
	burger.classList.remove('active');
}

// Функція відкриття меню
function openMenu() {
	nav.classList.add('nav-active');
	burger.classList.add('active');
}

// Перемикання меню по бургеру
burger.addEventListener('click', (e) => {
	e.stopPropagation();
	if (nav.classList.contains('nav-active')) {
		closeMenu();
	} else {
		openMenu();
	}
});

// Закриття меню при кліку на будь-яке посилання в меню
navLinks.forEach((link) => {
	link.addEventListener('click', () => {
		closeMenu();
	});
});

// Закриття меню при кліку поза меню
document.addEventListener('click', (e) => {
	if (!burger.contains(e.target) && !nav.contains(e.target)) {
		closeMenu();
	}
});

// Закриття меню при зміні розміру вікна
window.addEventListener('resize', () => {
	if (window.innerWidth > 768) {
		closeMenu();
	}
});

const clouds = document.querySelector('.layer-clouds');
const birds = document.querySelector('.layer-birds');

// Функція обробки скролу
function handleScroll() {
	const scroll = window.scrollY;

	// Додано перевірку на існування елементів
	if (clouds) {
		clouds.style.transform = `translateY(${scroll * 0.2}px)`;
	}

	if (birds) {
		birds.style.transform = `translateY(${scroll * 0.4}px)`;
	}
}

// Функція throttle для оптимізації scroll події
function throttle(func, delay) {
	let lastCall = 0;
	return function (...args) {
		const now = Date.now();
		if (now - lastCall >= delay) {
			lastCall = now;
			func.apply(this, args);
		}
	};
}

// ЄДИНИЙ обробник scroll з throttle
window.addEventListener('scroll', throttle(handleScroll, 16));

// Модальне вікно
const modal = document.getElementById('modal');
const openModalBtns = document.querySelectorAll('.book-btn, .book-btn-mobile, .footer .book-btn');
const closeModalBtn = document.querySelector('.modal__close');

// Функція блокування скролу
function disableScroll() {
	document.body.style.overflow = 'hidden';
	document.body.classList.add('modal-open');
}

function enableScroll() {
	document.body.style.overflow = '';
	document.body.classList.remove('modal-open');
}

// відкрити (для всіх кнопок)
openModalBtns.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		modal.classList.add('active');
		disableScroll();
		closeMenu();
	});
});

// закрити по хрестику
closeModalBtn.addEventListener('click', () => {
	modal.classList.remove('active');
	enableScroll();
});

// закрити по кліку на фон
modal.addEventListener('click', (e) => {
	if (e.target === modal) {
		modal.classList.remove('active');
		enableScroll();
	}
});

// закрити по ESC
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && modal.classList.contains('active')) {
		modal.classList.remove('active');
		enableScroll();
		if (nav.classList.contains('nav-active')) {
			closeMenu();
		}
	}
});
