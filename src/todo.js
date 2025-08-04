class Todo {
  constructor(title, description, dueDate, priority) {
    // this.id = this.generateId()
    this.title = title
    this.description = description
    this.dueDate = dueDate
    this.priority = priority
    // You might also want to include ////notes or even a checklist.
    this.completed = false
  }

  toggleComplete() {
    this.completed = !this.completed
  }
}

export {Todo}
