<template>
    <form @submit.prevent="handleSubmit">
        <input v-model="newTask" type="text">
        <button type="submit">Add</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from "./../stores/TaskStore"
const taskStore = useTaskStore();
const newTask = ref();
const handleSubmit = () => {
    if (newTask.value.length > 0) {
        taskStore.addTask({
            id: Math.floor(Math.random() * 10000),
            title: newTask.value,
            isFav: false,
        })
        newTask.value = '';
    }
};
</script>

<style scoped></style>