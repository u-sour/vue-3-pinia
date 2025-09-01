<template>
    <div class="task">
        <h3>{{ task.title }}</h3>
        <div class="icons">
            <i class="material-icons" @click="handleDeleteTask(task.id)">delete</i>
            <i class="material-icons" :class="{ active: task.isFav }" @click="handleToggleTask(task.id)">favorite</i>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskSetupStore } from '../stores/TaskSetupStore';
const props = defineProps({
    task: {
        task: Object,
        required: true
    }
})
const task = ref(props.task);
const taskStore = useTaskSetupStore();
const { deleteTask, toggleFav } = taskStore;

//actions methods
const handleDeleteTask = (id) => deleteTask(id);
const handleToggleTask = (id) => toggleFav(id); 
</script>

<style scoped></style>