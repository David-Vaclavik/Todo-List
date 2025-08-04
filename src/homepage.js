import restaurantImage from './homepage-img.jpg';

const homepage = function() {
    console.log("Homepage Function");
    const content = document.getElementById('content');

    content.textContent = '';
    content.style.backgroundImage = '';

    content.style.backgroundImage = `url(${restaurantImage})`;

    const h2 = document.createElement('h2');
    h2.textContent = "Get Your Buns in Here!";
    content.appendChild(h2);
}

export {homepage};
