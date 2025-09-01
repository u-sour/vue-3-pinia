import { defineStore } from "pinia";
//note: run cmd: npx json-server --w src/data/db.json
const dataUrl = "http://localhost:3000/tasks";
export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    loading: false,
  }),
  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },
    favCount() {
      return this.tasks.reduce((preValue, curValue) => {
        return curValue.isFav ? preValue + 1 : preValue;
      }, 0);
    },
    totalCount: (state) => state.tasks.length,
  },
  actions: {
    async getTasks() {
      this.loading = true;
      const res = await fetch(dataUrl);
      const data = await res.json();
      this.tasks = data;
      this.loading = false;
    },
    async addTask(task) {
      this.tasks.push(task);
      const res = await fetch(dataUrl, {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      if (res.error) return alert(res.error);
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((t) => t.id !== id);
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
    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;

      const res = await fetch(`${dataUrl}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isFav: task.isFav }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.error) return alert(res.error);
    },
  },
});
