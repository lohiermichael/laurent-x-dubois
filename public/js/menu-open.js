// It is initialized in the header.js file but some elements can be added to it
// in other Javascript files: contact.js, gallery.js...
import { elementsToChangeOpen } from './header.js'

let STATE = "DROPDOWN_CLOSED"

// For mobiles ant tablets, on click item-with-dropdown show the dropdown
const itemWithDropdown = document.querySelector('.menu-nav__item-with-dropdown>.menu-nav__link');
const dropdownMenu = document.querySelector('.menu-nav__dropdown-menu');
itemWithDropdown.addEventListener('click', () => {
    if (window.innerWidth < 992) {
        dropdownMenu.classList.toggle('dropdown-open');
        itemWithDropdown.classList.toggle('dropdown-open');
        // Update the state
        if (STATE == "DROPDOWN_CLOSED") {
            STATE = "DROPDOWN_OPENED";
        } else {
            STATE = "DROPDOWN_CLOSED";
        }
    }
});

const burgerButton = document.querySelector('.burger-button');

function toggleMobileMenu() {
    elementsToChangeOpen.map(element => {
        element.classList.toggle('menu-open');
    })
};

burgerButton.addEventListener('click', () => {
    if (window.innerWidth < 992) {
        // If it is opened, close the dropdown when closing the menu
        if (STATE == "DROPDOWN_OPENED") {
            dropdownMenu.classList.remove('dropdown-open');
            itemWithDropdown.classList.remove('dropdown-open');
        }

        // Update the state
        if (STATE == "DROPDOWN_CLOSED") {
            STATE = "DROPDOWN_OPENED";
        } else {
            STATE = "DROPDOWN_CLOSED";
        }
        toggleMobileMenu();
    }
});

// Close mobile menu on resize
window.addEventListener('resize', () => {
    const isMenuOpened = elementsToChangeOpen[0].classList.contains('menu-open');
    if (window.innerWidth >= 992 & isMenuOpened) toggleMobileMenu();

});

