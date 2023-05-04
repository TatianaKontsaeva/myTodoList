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
                &#10004;
              </button>
              <button
                @click="deleteTodo(todo.id)" 
                class="button is-danger is-light is-outlined ml-2">
                &#10006;
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
import { ref, onMounted } from 'vue';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  doc, 
  deleteDoc, 
  updateDoc,
  query, 
  orderBy,
 } from "firebase/firestore";
import { db } from '@/firebase';

//firebase ref 

const todoCollectionRef = collection(db, "todos");
const todoCollectionQuery = query(todoCollectionRef, orderBy("date", "desc"));
const filters = ref(['All', 'Open', 'Completed']);
const activeFilter = ref('All');

//todoList
const todos = ref ([
]);

//get todos
onMounted(async () => {
  onSnapshot(todoCollectionQuery, (querySnapshot) => {
    const fbTodos = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done,
    }; 
    fbTodos.push(todo); 
    });
    todos.value = fbTodos;
  });
})

//methods

const newTodoContent = ref (""); //ref получает внутреннее значение и вернет мутируемый реф объект

const addTodo = async () => {
  await addDoc(todoCollectionRef, {
  content: newTodoContent.value,
  done: false,
  date: Date.now(),
});
  newTodoContent.value = "";
};

//delete todo
const deleteTodo = async (id) => {
  // todos.value = todos.value.filter((todo) => todo.id !== id);
  await deleteDoc(doc(todoCollectionRef,id));
}

//toggler
const toggleDone = (id) => {
  const index = todos.value.findIndex((todo) => todo.id === id);
  todos.value[index].done = !todos.value[index].done;
  updateDoc(doc(todoCollectionRef,id), {
  done: !todos.value[index].done
});
}




  

</script>


<style>
@import "bulma/css/bulma.min.css";
.todo-wrapper {
  max-width: 900px;
  padding: 40px;
  margin: 0 auto;
  border: 1px solid #003B46;
  border-radius: 20px;
  background: #34554d;
}
.line-through {
  text-decoration: line-through;
}

</style>