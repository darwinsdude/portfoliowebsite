const navItems = document.getElementsByClassName('contact-button');

Array.from(navItems).forEach(navItem => {
    const anchor = navItem.querySelector('a'); // Get the <a> element

    // Event listener for mouseover
    anchor.addEventListener('mouseover', () => anchor.style.color = 'rgb(157, 199, 161)');

    // Event listener for mouseout
    anchor.addEventListener('mouseout', () => anchor.style.color = '');
});
