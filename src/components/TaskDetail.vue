<template>
    <div class="task">
        <h3>{{ task.title }}</h3>
        <div class="icons">
            <i class="material-icons" @click="deleteTask(task.id)">delete</i>
            <i class="material-icons" :class="{ active: task.isFav }" @click="toggleTask(task.id)">favorite</i>
        </div>
    </div>
</template>

<script setup>
import { useTaskStore } from "./../stores/TaskStore"
import { ref } from 'vue';
const props = defineProps({
    task: {
        task: Object,
        required: true
    }
})
const task = ref(props.task);
const taskStore = useTaskStore();

//actions methods
const deleteTask = (id) => taskStore.deleteTask(id);
const toggleTask = (id) => taskStore.toggleFav(id); 
</script>

<style scoped></style>