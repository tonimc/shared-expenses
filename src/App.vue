<template>
  <div id="app">
    <div class="navbar">
      <h1>Share your expenses</h1>
      <div>
        <img alt="Vue logo" src="./assets/logo.png" />
        <img alt="JSOurense logo" src="./assets/logo.jpg" />
      </div>
    </div>
    <SharedExpenses />
  </div>
</template>

<script>
import SharedExpenses from './components/SharedExpenses.vue';

export default {
  name: 'App',
  components: {
    SharedExpenses
  }
};
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .navbar {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid black;
    padding-left: 1rem;
    padding-right: 1rem;
    justify-content: space-between;

    h1 {
      font-size: 2rem;
    }
    img {
      height: 40px;
      margin-left: 1rem;
    }
  }
}
</style>
