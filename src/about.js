const about = function() {
    console.log("About Function");
    const content = document.getElementById('content');

    content.textContent = '';
    content.style.backgroundImage = '';

    const divAbout = document.createElement('div');
    divAbout.className = 'about';
    content.appendChild(divAbout);

    const h1 = document.createElement('h1');
    h1.textContent = "About Big Buns";
    divAbout.appendChild(h1);

    const story = document.createElement('div');
    story.className = 'story';
    
    const p1 = document.createElement('p');
    p1.textContent = "Since 1985, Big Buns has been serving the community with the juiciest burgers and the most delicious comfort food in town.";
    story.appendChild(p1);

    const p2 = document.createElement('p');
    p2.textContent = "Our family-owned restaurant started as a small food truck and has grown into the beloved local institution you see today.";
    story.appendChild(p2);

    const p3 = document.createElement('p');
    p3.textContent = "We pride ourselves on using only the freshest ingredients, locally sourced whenever possible, and preparing everything with love.";
    story.appendChild(p3);

    divAbout.appendChild(story);

    // Location and hours
    const info = document.createElement('div');
    info.className = 'restaurant-info';

    const locationH3 = document.createElement('h3');
    locationH3.textContent = "📍 Location";
    info.appendChild(locationH3);

    const address = document.createElement('p');
    address.textContent = "123 Burger Street, Food City, FC 12345";
    info.appendChild(address);

    const hoursH3 = document.createElement('h3');
    hoursH3.textContent = "🕒 Hours";
    info.appendChild(hoursH3);

    const hours = document.createElement('p');
    hours.textContent = "Monday - Sunday: 11:00 AM - 10:00 PM";
    info.appendChild(hours);

    const phoneH3 = document.createElement('h3');
    phoneH3.textContent = "📞 Contact";
    info.appendChild(phoneH3);

    const phone = document.createElement('p');
    phone.textContent = "(555) 123-BUNS";
    info.appendChild(phone);

    divAbout.appendChild(info);
}

export {about};
