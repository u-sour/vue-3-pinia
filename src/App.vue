<template>
  <main>
    <!--header-->
    <header>
      <h1>🍍 Pinia Tasks</h1>
    </header>
    <!--new task form-->
    <div class="new-task-form">
      <TaskForm />
    </div>
    <!-- filter--->
    <div class="filter">
      <button :class="{ active: filter === 'all' }" @click="setFilter('all')">All Tasks</button>
      <button :class="{ active: filter === 'favs' }" @click="setFilter('favs')">Fav Tasks</button>
      <button @click="resetState">Reset</button>
    </div>
    <!---Loading tasks-->
    <div class="loading" v-if="loading">Loading ...</div>
    <div class="task-list" v-else-if="filter === 'all'">
      <h3>You have {{ totalCount }} tasks left to do</h3>
      <template v-for="task in state.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </template>
    </div>

    <div class="task-list" v-else="filter === 'favs'">
      <h3>You have {{ favCount }} tasks left to do</h3>
      <template v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </template>
    </div>
  </main>
</template>

<script setup>
import { useTaskSetupStore } from "./stores/TaskSetupStore";
import TaskForm from "./components/TaskForm.vue";
import TaskDetails from "./components/TaskDetail.vue"
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
const taskStore = useTaskSetupStore();
const filter = ref('all');
//fetch tasks
//note: run cmd: npx json-server --w src/data/db.json
onMounted(() => {
  taskStore.getTasks();
})
// store to ref
const { state, favs, totalCount, favCount } = storeToRefs(taskStore)
//methods
const setFilter = (value) => filter.value = value;
const resetState = () => taskStore.reset();
</script>

<style scoped></style>
