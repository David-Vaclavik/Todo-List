class TodoUI {
  constructor() {
    this.container = document.getElementById('content')
    this.todos = []
  }

  init() {
    this.render()
    this.bindEvents()
  }

  render() {
    // Main DOM manipulation here
    console.log("render");
  }

  bindEvents() {
    // Event listeners here
    console.log("events");
  }
}

export {TodoUI}
