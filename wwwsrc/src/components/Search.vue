<template>
  <div id="site-search">
    <v-text-field v-model="searchValue" placeholder="Search"></v-text-field>
    <v-icon @click="search">search</v-icon>
  </div>
</template>

<script>
  export default {
    name: "search",
    data() {
      return {
        searchValue: ""
      };
    },
    methods: {
      search() {
        this.$store.dispatch("search", { value: this.searchValue });
      }
    }
  };
</script>

<style>
  #site-search {
    display: flex;
  }
</style>