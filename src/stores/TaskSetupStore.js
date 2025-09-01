import { defineStore } from "pinia";
import { ref, computed } from "vue";
//note: run cmd: npx json-server --w src/data/db.json
const dataUrl = "http://localhost:3000/tasks";
export const useTaskSetupStore = defineStore("taskSetupStore", () => {
  const state = ref({ tasks: [], loading: false });
  // getters
  const favs = computed(() => state.value.tasks.filter((t) => t.isFav));
  const favCount = computed(() =>
    state.value.tasks.reduce((preValue, curValue) => {
      return curValue.isFav ? preValue + 1 : preValue;
    }, 0)
  );
  const totalCount = computed(() => state.value.tasks.length);
  // actions
  async function getTasks() {
    state.value.loading = true;
    const res = await fetch(dataUrl);
    const data = await res.json();
    state.value.tasks = data;
    state.value.loading = false;
  }
  async function addTask(task) {
    state.value.tasks.push(task);
    const res = await fetch(dataUrl, {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });
    if (res.error) return alert(res.error);
  }
  async function deleteTask(id) {
    state.value.tasks = state.value.tasks.filter((t) => t.id !== id);
    try {
      const res = await fetch(`${dataUrl}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Delete failed: ${res.status} ${text || ""}`);
      }
    } catch (error) {
      alert(res.error);
    }
  }
  async function toggleFav(id) {
    const task = state.value.tasks.find((t) => t.id === id);
    task.isFav = !task.isFav;

    const res = await fetch(`${dataUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isFav: task.isFav }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.error) return alert(res.error);
  }

  function reset() {
    state.value = { tasks: [], loading: false };
  }
  return {
    state,
    favs,
    favCount,
    totalCount,
    getTasks,
    addTask,
    deleteTask,
    toggleFav,
    reset,
  };
});
