const menu = function() {
    console.log("Menu Function");
    const content = document.getElementById('content');

    content.textContent = '';
    content.style.backgroundImage = '';

    const divMenu = document.createElement('div');
    divMenu.className = 'menu';
    content.appendChild(divMenu);

    // Helper function to create menu items
    const createMenuItem = (emoji, name, description) => {
        const divItem = document.createElement('div');
        divItem.className = 'item';
        
        const h1 = document.createElement('h1');
        h1.textContent = emoji;
        divItem.appendChild(h1);
        
        const h3 = document.createElement('h3');
        h3.textContent = name;
        divItem.appendChild(h3);
        
        const para = document.createElement('p');
        para.textContent = description;
        divItem.appendChild(para);
        
        return divItem;
    }

    // Create all menu items
    const menuItems = [
        {
            emoji: "🍔",
            name: "Hamburger",
            description: "Buns, Patty, Tomato, Onions, Lettuce, Cheese, Sauce."
        },
        {
            emoji: "🌭",
            name: "Hot Dog",
            description: "Buns, Sausage, Mustard, Ketchup, Pickles or relish."
        },
        {
            emoji: "🍕",
            name: "Pizza",
            description: "Tomato Sauce, Mozzarella Cheese, Pepperoni, Onions."
        },
        {
            emoji: "🌮",
            name: "Taco",
            description: "Tortilla, Beef, Lettuce, Tomato, Cheese, Onion, Salsa."
        },
        {
            emoji: "🍟",
            name: "French Fries",
            description: "Potatoes, Vegetable Oil, Salt."
        },
        {
            emoji: "🍦",
            name: "Ice Cream",
            description: "Vanilla or Raspberry"
        }
    ];

    // Add all items to the menu
    menuItems.forEach(item => {
        const menuItem = createMenuItem(item.emoji, item.name, item.description);
        divMenu.appendChild(menuItem);
    });
}

export { menu };
