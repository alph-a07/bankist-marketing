'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

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
