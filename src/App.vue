<template>
  <div class="todo-wrapper">
    <div class="title is-2 has-text-centered has-text-white">My ToDo List</div>
      <form @submit.prevent="addTodo">
        <div class="field is-grouped mb-5">
        <p class="control is-expanded">
          <input 
          v-model="newTodoContent"
          class="input is-primary is-outlined" 
          type="text" 
          placeholder="Add todo">
        </p>
        <p class="control">
          <button :disabled="!newTodoContent" class="button is-primary">Add</button>
        </p>
      </div>
      </form>
     

    
    <div 
    v-for="todo in todos" 
    :key="todo.id" 
    class="card mb-5"
    :class="{'has-background-success-light': todo.done}"
    >

      <div class="card-content">
        <div class="content">
          <div class="columns is-mobile is-vcentered">
            <div class="column" :class="{'has-text-success line-through' :todo.done}">{{todo.content}}</div>
            <div class="is-5 has-text-right">
              <button 
                @click="toggleDone(todo.id)"
                :class="todo.done ? 'is-success' : 'is-light'"
                class="button is-success is-outlined">
                &check;
              </button>
              <button
                @click="deleteTodo(todo.id)" 
                class="button is-danger is-light is-outlined ml-2">
                &cross;
              </button>
            </div>
          </div>
        
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
//import
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';



//todoList
const todos = ref ([
  // {
  //   id: 'id1',
  //   content: 'hello',
  //   done: false 
  // },
  // {
  //   id: 'id2',
  //   content: 'buy',
  //   done: true 
  // }
]);


//methods

const newTodoContent = ref (""); //ref получает внутреннее значение и вернет мутируемый реф объект

const addTodo = () => {
  const newTodo = {
    id: uuidv4(),
    content: newTodoContent.value,
    done: false, 
  };
  todos.value.unshift(newTodo);
  newTodoContent.value = "";
};

//delete todo

const deleteTodo = (id) => {
  todos.value = todos.value.filter((todo) => todo.id !== id);
}

//toggler
const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  todos.value[index].done = !todos.value[index].done;
}
</script>


<style>
@import "bulma/css/bulma.min.css";
.todo-wrapper {
  max-width: 800px;
  padding: 20px;
  margin: 0 auto;
  border: 1px solid #0a0a0a;
  background: #1e1e1e;
}
.line-through {
  text-decoration: line-through;
}

</style>