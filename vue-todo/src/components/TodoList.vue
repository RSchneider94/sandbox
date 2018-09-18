<template>
  <div class="row">
    <div class="todo-list__container col-6 m-auto">
      <!-- <div class="alert alert-secondary" role="alert">
        Teste
      </div> -->
      <input type="text"
        class="form-control form-control-lg text-center"
        v-model="listTitle">
      <form @submit.prevent="addNewItem">
        <input type="text"
        class="form-control form-control-lg"
        placeholder="Add new item..."
        ref="newItem">
      </form>
      <ul class="todo-list__items list-group list-group-flush pb-4">
        <p class="list-group-item"
          v-if="listItems.length <= 0">
          No items in the list. Try adding one! :)
        </p>
        <li 
          v-for="item in listItems"
          v-bind:key="item.id"
          @click="removeItem(item.id)"
          class="list-group-item">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
      listTitle: "Default List",
      listItems: []
    };
  },
  methods: {
    generateNewItemId() {
      return this.listItems.length > 0 ?
        this.listItems[this.listItems.length - 1].id + 1 : 0;
    },
    generateName() {
      var name = this.$refs.newItem.value;
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    addNewItem() {
      var newItem = {
        id: this.generateNewItemId(),
        name: this.generateName()
      };
      this.listItems.push(newItem);
      this.saveLocalStorage(JSON.stringify(this.listItems));
      this.$refs.newItem.value = '';
    },
    removeItem(item) {
      var index = this.listItems.findIndex(element => element.id === item);
      this.listItems.splice(index, 1);
      this.saveLocalStorage(JSON.stringify(this.listItems));
    },
    saveLocalStorage(stringListItens) {
      localStorage.setItem('listItens', stringListItens);
    },
    populateList() {
      if(localStorage.getItem('listItens')) {
        var storage = JSON.parse(localStorage.getItem('listItens'));
        storage.forEach(element => {
          this.listItems.push(element);
        });
      }
    }
  },
  created() {
    this.populateList();
  }
};
</script>

<style scoped>
.form-control,
.form-control-lg {
  border: 0;
  border-radius: 0;
}
.form-control:focus {
  border-color: transparent;
  box-shadow: none;
  -webkit-box-shadow: none;
}
.todo-list__items {
  font-size: 1.25em;
}
li { cursor: pointer; }
</style>
