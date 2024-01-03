'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');

// ------------ FUNCTIONS ------------

//-> Function to display modal
const openModal = function (e) {
    e.preventDefault();

    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

//-> Function to close the modal
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

// PAGE NAVIGATION
document.querySelector('.nav__links').addEventListener('click', function (event) {
    event.preventDefault();

    if (event.target.classList.contains('nav__link')) {
        const sectionId = event.target.getAttribute('href');
        document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
    }
});

// STICKY NAVIGATION
// const section1Top = section1.getBoundingClientRect().top;
// window.addEventListener('scroll', function () {
//     if (window.scrollY > section1Top) nav.classList.add('sticky');
//     else nav.classList.remove('sticky');
// });
const navBarHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
    const [entry] = entries; // Destructuring

    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
};

const navObserver = new IntersectionObserver(stickyNav, { root: null, threshold: 0, rootMargin: `-${navBarHeight}px` });
navObserver.observe(header);

// LAZY LOADING ANIMATION ON SECTIONS
const lazySections = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target); // Unobserve after loading once
};

const sectionObserver = new IntersectionObserver(lazySections, { root: null, threshold: 0.15 });

document.querySelectorAll('.section').forEach(section => {
    // section.classList.add('section--hidden');
    sectionObserver.observe(section);
});

// LAZY LOADING IMAGES TO IMPROVE PERFORMANCE
const laztImgs = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    // Remove the blur filter when the image is loaded, otherwise the low quality image will be visible
    entry.target.addEventListener('load', () => entry.target.classList.remove('lazy-img'));
    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(laztImgs, { root: null, threshold: 0 });

document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));

// TABBED OPERATIONS
tabsContainer.addEventListener('click', function (event) {
    // closest() to avoid selecting spans
    const clickedTab = event.target.closest('.operations__tab');

    // GUARD CLAUSE
    if (!clickedTab) return;

    // Remove active classes for all
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    // Add active classes to clicked tab and corresponding content
    clickedTab.classList.add('operations__tab--active');
    document.querySelector(`.operations__content--${clickedTab.dataset.tab}`).classList.add('operations__content--active');
});

// NAV MENU ANIMATIONS
const handleHover = function (event) {
    if (event.target.classList.contains('nav__link')) {
        const link = event.target;
        const siblings = link.closest('.nav__links').querySelectorAll('.nav__link');

        siblings.forEach(l => {
            if (l !== link) l.style.opacity = this;
        });
    }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// REVIEWS ARROW AND DOTS NAVIGATION

const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
let currSlide = 0;

const updateDots = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide='${slide}']`).classList.add('dots__dot--active');
};

const goToSlide = function (sl) {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - sl)}%)`;
    });
    updateDots(sl);
};

const nextSlide = function () {
    if (currSlide == slides.length - 1) currSlide = 0;
    else currSlide++;

    goToSlide(currSlide);
};

const prevSlide = function () {
    if (currSlide == 0) currSlide = slides.length - 1;
    else currSlide--;

    goToSlide(currSlide);
};

const createDots = function () {
    slides.forEach((_, index) => {
        dotsContainer.insertAdjacentHTML('beforeend', `<button class='dots__dot' data-slide=${index}></button>`);
    });
};

// Move slides towards right at their respective positions
createDots();
goToSlide(currSlide); // 0% 100% 200%

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') nextSlide();
    if (event.key === 'ArrowLeft') prevSlide();
});

// Updates slides on dots click
dotsContainer.addEventListener('click', function (event) {
    if (!event.target.classList.contains('dots__dot')) return;

    const slide = event.target.dataset.slide;
    goToSlide(slide);
});

// ------------ EVENT LISTENERS ------------

//-> Open modal event listener
btnsOpenModal.forEach(btn => {
    btn.addEventListener('click', openModal);
});

//-> Close modal event listeners
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

//-> Learn more event listener
btnScrollTo.addEventListener('click', function () {
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords.left, s1coords.top);

    section1.scrollIntoView({ behavior: 'smooth' });
});
