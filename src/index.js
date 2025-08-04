// src/index.js
import "./styles.css";
import { homepage } from "./homepage.js";
import { menu } from "./menu.js";
import { about } from "./about.js";

// const content = document.getElementById('content');
const homeButton = document.querySelector("[data-home]")
const menuButton = document.querySelector("[data-menu]")
const aboutButton = document.querySelector("[data-about]")

homepage();

homeButton.addEventListener('click', () => {
    homepage();
})

menuButton.addEventListener('click', () => {
    menu();
})

aboutButton.addEventListener('click', () => {
    about();
})
