(function () {
    "use strict";

    const select = (el, all = false) => {
        el = el.trim();
        return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
    };

    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all);
        if (selectEl) {
            if (all) {
                selectEl.forEach((e) => e.addEventListener(type, listener));
            } else {
                selectEl.addEventListener(type, listener);
            }
        }
    };

    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener);
    };

    const scrollTo = (target) => {
        const header = select('#header');
        const offset = header.offsetHeight + (header.classList.contains('header-scrolled') ? 0 : -16);
        const elementPos = select(target).offsetTop;

        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        });
    };

    const toggleClass = (element, className) => {
        element.classList.toggle(className);
    };

    const handleNavbarLinks = () => {
        const position = window.scrollY + 200;
        const navbarlinks = select('.navbar ul.nav-links li a', true);
        navbarlinks.forEach((navbarlink) => {
            if (!navbarlink.hash) return;
            const section = select(navbarlink.hash);
            if (section && position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active');
            } else {
                navbarlink.classList.remove('active');
            }
        });
    };

    const toggleMobileNav = () => {
        const navbar = select('#navbar');
        toggleClass(navbar, 'navbar-mobile');
        toggleClass(select('.mobile-nav-toggle'), 'bi-list');
        toggleClass(select('.mobile-nav-toggle'), 'bi-x');
        toggleClass(select('.navbar-toggler'), 'hamburger-menu'); // Add this line to toggle hamburger menu
    };

    const handleNavDropdowns = (e) => {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault();
            e.target.nextElementSibling.classList.toggle('dropdown-active');
        }
    };

    on('load', window, handleNavbarLinks);
    onscroll(document, handleNavbarLinks);

    on('click', '.scrollto', (e) => {
        if (select(e.target.hash)) {
            e.preventDefault();
            const navbar = select('#navbar');
            if (navbar.classList.contains('navbar-mobile')) {
                toggleMobileNav();
            }
            scrollTo(e.target.hash);
        }
    }, true);

    on('click', '.mobile-nav-toggle', toggleMobileNav);
    on('click', '.navbar .dropdown > a', handleNavDropdowns, true);

    // Add event listener for toggling the collapse content
    const navbarToggleBtn = select('.navbar-toggler');
    const navbarContent = select('#navbarToggleExternalContent');
    on('click', '.navbar-toggler', () => {
        toggleClass(navbarContent, 'show');
    });
})();
