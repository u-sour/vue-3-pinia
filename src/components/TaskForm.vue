<template>
    <form @submit.prevent="handleSubmit">
        <input v-model="newTask" type="text">
        <button type="submit">Add</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskSetupStore } from '../stores/TaskSetupStore';
const { addTask } = useTaskSetupStore();

const newTask = ref();
const handleSubmit = () => {
    if (newTask.value.length > 0) {
        addTask({
            id: Math.floor(Math.random() * 10000).toString,
            title: newTask.value,
            isFav: false,
        })
        newTask.value = '';
    }
};
</script>

<style scoped></style>