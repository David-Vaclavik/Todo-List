// src/index.js
import "./styles.css";
import {TodoUI} from "./dom.js";
import {Todo} from "./todo.js";
import {Project} from "./project.js";


// const homeButton = document.querySelector("[data-home]")
// homeButton.addEventListener('click', () => {
//     homepage();
// })

const app = new TodoUI();
app.init();

//! Projects not yet implemented - WIP
// const pro = new Project("Cars");
// pro.test();



/*
src/
├── index.js          // Entry point, imports everything - ✅
├── styles.css        // All styles - ✅
├── template.html     // HTML template - ✅
├── dom.js            // DOM manipulation - ✅
├── todo.js           // Main app logic & Todo class/data model - ✅
├── project.js        // Project class (if using projects) - ✅

├── storage.js        // localStorage handling
├── domUtils.js       // Reusable DOM functions
└── dateUtils.js      // Date formatting utilities
*/
