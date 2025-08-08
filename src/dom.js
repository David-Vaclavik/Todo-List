import {storage, projectsFromStorage, Todo, TodoStorage} from "./todo.js";
import { format, parseISO, parse, isAfter, isBefore, addDays, startOfDay } from "date-fns";

class TodoUI {
  constructor() {
    this.container = document.querySelector('.content')
    this.todos = []
  }

  init() {
    TodoUI.renderProjects();
    TodoUI.render();
    this.bindEvents()
  }

  static createTodoItem(id, completed, title, dueDate, priority) {
    const div = document.createElement('div');
    div.className = `todo ${priority}`;
    div.id = id;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = completed;
    div.appendChild(checkbox);

    const h3 = document.createElement('h3');
    h3.textContent = title;
    div.appendChild(h3);

    const span = document.createElement('span');
    span.textContent = dueDate;
    div.appendChild(span);

    //! Future feature
    /*
    const detailsBtn = document.createElement('button');
    detailsBtn.className = 'details-btn';
    detailsBtn.innerHTML = 'DETAILS';
    div.appendChild(detailsBtn);

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="Edit--Streamline-Unicons" height="24" width="24">
      <desc>
        Edit Streamline Icon: https://streamlinehq.com
      </desc>
      <path d="M22.5775 12.0034c-0.3118 0 -0.6108 0.1239 -0.8313 0.3444s-0.3443 0.5195 -0.3443 0.8313v7.0539c0 0.3118 -0.1239 0.6109 -0.3444 0.8313s-0.5195 0.3444 -0.8313 0.3444H3.767c-0.3118 0 -0.6109 -0.1239 -0.8313 -0.3444 -0.2205 -0.2204 -0.3444 -0.5195 -0.3444 -0.8313V3.7738c0 -0.3118 0.1239 -0.6108 0.3444 -0.8313 0.2204 -0.2205 0.5195 -0.3444 0.8313 -0.3444h7.0539c0.3118 0 0.6109 -0.1238 0.8313 -0.3443 0.2205 -0.2205 0.3444 -0.5195 0.3444 -0.8313s-0.1239 -0.6109 -0.3444 -0.8313c-0.2204 -0.2205 -0.5195 -0.3444 -0.8313 -0.3444H3.767c-0.9354 0 -1.8325 0.3716 -2.494 1.0331C0.6116 1.9413 0.24 2.8384 0.24 3.7738V20.233c0 0.9354 0.3716 1.8325 1.033 2.494 0.6615 0.6614 1.5586 1.033 2.494 1.033h16.4592c0.9354 0 1.8325 -0.3716 2.4939 -1.033 0.6615 -0.6615 1.0331 -1.5586 1.0331 -2.494v-7.0539c0 -0.3118 -0.1239 -0.6109 -0.3444 -0.8313s-0.5195 -0.3444 -0.8313 -0.3444Zm-17.6349 0.8935v4.9848c0 0.3118 0.1239 0.6109 0.3444 0.8313 0.2205 0.2205 0.5195 0.3444 0.8313 0.3444h4.9848c0.1547 0.0009 0.3081 -0.0288 0.4513 -0.0873s0.2736 -0.1447 0.3834 -0.2537l8.1356 -8.1473 3.3388 -3.2683c0.1102 -0.1093 0.1977 -0.2393 0.2574 -0.3826 0.0597 -0.1433 0.0904 -0.2969 0.0904 -0.4521s-0.0307 -0.3089 -0.0904 -0.4522c-0.0597 -0.1432 -0.1472 -0.2733 -0.2574 -0.3825L18.4275 0.5878c-0.1094 -0.1102 -0.2394 -0.1977 -0.3826 -0.2574 -0.1433 -0.0597 -0.297 -0.0904 -0.4522 -0.0904s-0.3088 0.0307 -0.4521 0.0904c-0.1432 0.0597 -0.2732 0.1472 -0.3826 0.2574l-3.3153 3.3271 -8.1591 8.1473c-0.109 0.1098 -0.1952 0.2402 -0.2537 0.3834 -0.0585 0.1432 -0.0881 0.2966 -0.0873 0.4513Zm12.6501 -9.8167 3.3271 3.3271 -1.6694 1.6694 -3.3271 -3.3271 1.6694 -1.6694ZM7.294 13.3789l6.9716 -6.9716 3.3271 3.3271 -6.9716 6.9716H7.294v-3.3271Z" fill="currentColor" stroke-width="1"></path>
      </svg>
    `;
    div.appendChild(editBtn);
    */

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="Trash-Alt--Streamline-Unicons" height="24" width="24">
      <desc>
        Trash Alt Streamline Icon: https://streamlinehq.com
      </desc>
      <path d="M9.648 19.056c0.3119 0 0.6111 -0.1239 0.8316 -0.3444s0.3444 -0.5197 0.3444 -0.8316v-7.056c0 -0.3119 -0.1239 -0.611 -0.3444 -0.8315s-0.5197 -0.3445 -0.8316 -0.3445c-0.3119 0 -0.611 0.124 -0.8316 0.3445 -0.2205 0.2205 -0.3444 0.5196 -0.3444 0.8315v7.056c0 0.3119 0.1239 0.6111 0.3444 0.8316 0.2206 0.2205 0.5197 0.3444 0.8316 0.3444Zm11.76 -14.112h-4.704V3.768c0 -0.9357 -0.3717 -1.833 -1.0333 -2.4947C15.009 0.6117 14.1116 0.24 13.176 0.24h-2.352c-0.9356 0 -1.833 0.3717 -2.4947 1.0333 -0.6616 0.6617 -1.0333 1.559 -1.0333 2.4947v1.176H2.592c-0.3119 0 -0.611 0.1239 -0.8316 0.3444 -0.2205 0.2206 -0.3444 0.5197 -0.3444 0.8316s0.1239 0.611 0.3444 0.8316c0.2206 0.2205 0.5197 0.3444 0.8316 0.3444h1.176v12.936c0 0.9356 0.3717 1.833 1.0333 2.4947 0.6617 0.6616 1.559 1.0333 2.4947 1.0333h9.408c0.9356 0 1.833 -0.3717 2.4947 -1.0333 0.6616 -0.6617 1.0333 -1.5591 1.0333 -2.4947V7.296h1.176c0.3119 0 0.6111 -0.1239 0.8316 -0.3444 0.2205 -0.2206 0.3444 -0.5197 0.3444 -0.8316s-0.1239 -0.611 -0.3444 -0.8316c-0.2205 -0.2205 -0.5197 -0.3444 -0.8316 -0.3444ZM9.648 3.768c0 -0.3119 0.124 -0.611 0.3445 -0.8316 0.2205 -0.2205 0.5196 -0.3444 0.8315 -0.3444h2.352c0.3119 0 0.6111 0.1239 0.8316 0.3444 0.2205 0.2206 0.3444 0.5197 0.3444 0.8316v1.176H9.648V3.768Zm8.232 16.464c0 0.3119 -0.124 0.611 -0.3444 0.8316s-0.5197 0.3444 -0.8316 0.3444H7.296c-0.3119 0 -0.611 -0.1239 -0.8316 -0.3444 -0.2205 -0.2205 -0.3444 -0.5197 -0.3444 -0.8316V7.296h11.76v12.936Zm-3.528 -1.176c0.3119 0 0.6111 -0.1239 0.8316 -0.3444s0.3444 -0.5197 0.3444 -0.8316v-7.056c0 -0.3119 -0.1239 -0.611 -0.3444 -0.8315s-0.5197 -0.3445 -0.8316 -0.3445c-0.3119 0 -0.611 0.124 -0.8315 0.3445s-0.3445 0.5196 -0.3445 0.8315v7.056c0 0.3119 0.124 0.6111 0.3445 0.8316s0.5196 0.3444 0.8315 0.3444Z" fill="currentColor" stroke-width="1"></path>
      </svg>
    `;
    div.appendChild(removeBtn);

    return div;
  }

  static createProjectButton(buttonName) {
    const projects = document.querySelector('.projects');

    const projectBtn = document.createElement('button');
    projectBtn.className = buttonName;
    projectBtn.setAttribute('data-project-button', '');
    projectBtn.innerHTML = buttonName;
    projects.appendChild(projectBtn);
  }

  static renderProjects() {
    const projectsContainer = document.querySelector('.projects');
    projectsContainer.innerHTML = '';

    projectsFromStorage.forEach(projectName => {
      TodoUI.createProjectButton(projectName);
    });
  }

  static render(tempStorage) {
    // Main DOM manipulation here
    // Renders all todos from storage
    const content = document.querySelector('.content');

    content.innerHTML = ''

    //  Render all todos from storage
    const currentStorage = tempStorage ? tempStorage : storage;
    currentStorage.forEach(item => {
        const todoItem = TodoUI.createTodoItem(item.id, item.completed, item.title, item.dueDate, item.priority);
        content.appendChild(todoItem);
    });

    const addTodo = document.createElement('button');
    addTodo.className = 'addTodo-btn';
    addTodo.dataset.openModal = '';
    addTodo.textContent = '+ Add Todo';
    content.appendChild(addTodo);

    // Remove project button if there are no projects
    console.log("this is currentStorage: ", currentStorage);
    if (currentStorage.length === 0) {
      console.log("there is no storage");

      const removeProjectBtn = document.createElement('button');
      removeProjectBtn.className = 'removeProject-btn';
      removeProjectBtn.dataset.removeProject = '';
      removeProjectBtn.textContent = '- Remove Project';
      content.appendChild(removeProjectBtn);
    }
  }

  /*
    Example HTML structure for a todo item:
    <div class="todo high" id="1">
      <input type="checkbox" class="todo-checkbox" checked>
      <h3>Todo Title</h3>
      <span>22 Aug 2025</span> - optional
      <button class="details-btn">DETAILS</button> //! WIP
      <button class="edit-btn"> //! WIP
        <!-- SVG icon for edit -->
      </button>
      <button class="remove-btn">
        <!-- SVG icon for remove -->
      </button>
    </div>
  */

  bindEvents() {
    document.addEventListener('click', (e) => {
      const target = e.target

      //* Handle navigation buttons
      //// tagName always needs uppercase
      if (target.closest('nav') && target.tagName === 'BUTTON') {
        // Remove active from all nav buttons
        document.querySelectorAll('nav button').forEach(btn => {
          btn.classList.remove('active')
        })

        // Add active to clicked nav button
        target.classList.add('active')
      }

      //* Home - Today - Week
      if (target.closest('[data-home]')) {
        TodoUI.render();
      }

      if (target.closest('[data-today]')) {
        const storageToday = TodoStorage.getTodayItems(storage);
        TodoUI.render(storageToday);
      }

      if (target.closest('[data-week]')) {
        const storageWeek = TodoStorage.getWeekItems(storage);
        TodoUI.render(storageWeek);
      }

      //* Handle any project button click
      if (target.closest('[data-project-button]')) {
        const projectName = target.innerHTML;
        const storageProject = TodoStorage.getProject(storage, projectName);
        TodoUI.render(storageProject);
      }

      //* Handles Add Project Modal
      const projectModal = document.querySelector("[data-project-modal]");
      if (target.closest('[data-add-project]')) {
        if (projectModal) projectModal.showModal();
      }

      if (target.closest('[data-close-project-modal]')) {
        if (projectModal) projectModal.close();
      }


      //* Handles TODO element checkbox
      if (target.closest('.todo-checkbox')) {

        //TODO: make getId method
        const todoCard = target.closest('.todo');
        const todoId = parseInt(todoCard.id);

        //TODO: should be in todo.js maybe?
        const todo = storage.find(item => item.id === todoId);

        if (todo) {
          todo.toggleComplete();
        }
      }

      //! Should add functionality for details and edit buttons
      // Details Button
      if (target.closest('.details-btn')) {
        console.log('Details Button');
        //TODO: Add details button functionality will be needed for edit too
        //TODO: It will use the same modal as the edit button
      }

      // Edit Button
      if (target.closest('.edit-btn')) {
        console.log('Edit todo')
        //TODO: Add edit button functionality
      }

      // Remove Button
      if (target.closest('.remove-btn')) {
        console.log("Remove Button");

        //TODO: make getId method
        const todoCard = target.closest('.todo')
        const todoId = parseInt(todoCard.id);

        // Remove from DOM
        todoCard.remove()

        // Remove todo from array
        TodoStorage.removeTodo(todoId)

        const activeButton = document.querySelector('.active');
        if (activeButton) activeButton.click();
      }

      // Remove project button
      if (target.closest('[data-remove-project]')) {
        // Selects project button based on active class
        let activeButton;
        const activeNav = document.querySelector('.active')
        if (activeNav) {
          const classes = Array.from(activeNav.classList);
          activeButton = classes[0];
        }

        // Removes from DOM
        activeNav.remove();

        // Removes from projectsFromStorage
        TodoStorage.removeProject(activeButton);

        TodoUI.render();
      }

      //* Handle add todo modal open
      if (target.hasAttribute('data-open-modal') || target.closest('[data-open-modal]')) {
        const modal = document.querySelector("[data-modal]");
        if (modal) {
          modal.showModal();
        }
      }

      //* Handle add todo modal close
      if (target.hasAttribute('data-close-modal') || target.closest('[data-close-modal]')) {
        const modal = document.querySelector("[data-modal]");
        if (modal) {
          modal.close();
        }
      }

    })

    // ======================= MODAL ============================
    /*
    // This below is trash use event delegation
    openButton.addEventListener('click', () => {
      modal.showModal();
    })

    closeButton.addEventListener('click', () => {
      modal.close();
    })
    */

    const projectModal = document.querySelector("[data-project-modal]");
    const projectForm = document.querySelector('.project-form');

    projectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const projectName = document.getElementById('project-name').value;

      TodoUI.createProjectButton(projectName);

      // Add to localStorage 
      projectsFromStorage.push(projectName);
      console.log(projectsFromStorage);
      localStorage.setItem("projects", JSON.stringify(projectsFromStorage));

      projectForm.reset();
      projectModal.close();
    })


    // Keep form submission and click outside main event listener
    const modal = document.querySelector("[data-modal]")
    const form = document.querySelector('.todo-form');

    //? Maybe should be in todo.js ?
    const seedId = 7; // Start from 7 to avoid conflicts with demo data
    if (!localStorage.getItem("id")) {
      localStorage.setItem("id", JSON.stringify(seedId));
    }
    let id = JSON.parse(localStorage.getItem("id"));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      // Get form input values
      const titleInput = document.getElementById('title').value;
      const descriptionInput = document.getElementById('description').value;
      const dueDateRaw = document.getElementById('due-date').value; // e.g. "2025-08-22"
      // change date format, if the date is not set, send empty string
      const dueDate = dueDateRaw ? format(parseISO(dueDateRaw), "dd MMM yyyy") : '';  // e.g. "22 Aug 2025"

      // Radio input for priority
      const formData = new FormData(form);
      const priority = formData.get('priority'); // 'low', 'medium', or 'high'

      // Assigns project based on active class
      //? Maybe should be in todo.js ?
      let project = 'General'
      const activeNav = document.querySelector('.active')
      if (activeNav) {
        const classes = Array.from(activeNav.classList); 
        project = classes[0];
      }

      // Add todo to storage
      TodoStorage.addTodo(id, titleInput, descriptionInput, dueDate, priority, project)
      console.log(storage);

      // render after add to storage - old Way
      ///// TodoUI.render();

      // Renders active button
      if (!activeNav) project = 'Home';
      const activeButton = document.querySelector(`.${project}`);
      if (activeButton) activeButton.click();

      //** increments ID each time a book is added and stores it in localStorage
      id++;
      localStorage.setItem('id', JSON.stringify(id));

      form.reset();
      modal.close();
    });

    // Closes any modal when clicked outside of it
    document.querySelectorAll('dialog').forEach(modal => {
      modal.addEventListener("click", e => {
        const rect = modal.getBoundingClientRect();
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        ) {
          modal.close();
        }
      });
    });
  }
}

export {TodoUI}
