<template>
  <div>
    <div
      v-for="event in events"
      :key="event.id"
      class="event"
      @click="$emit('selected-event', event)"
    >
      <h3>{{ event.name }}</h3>
      <h3>
        {{ event.people.length }}
        <img src="../assets/people.svg" class="icon" />
      </h3>
      <h3>
        {{ totalAmount(event) }} &#8364;
        <img src="../assets/money.svg" class="icon" />
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventsList',
  props: {
    events: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    totalAmount(event) {
      return event.people.reduce((amount, person) => amount + person.amount, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.event {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  padding: 1rem;
  background-color: #e8f5e9;
  border: 1px solid #4caf50;

  &:hover {
    cursor: pointer;
    background-color: #4caf50;
  }

  > h3 {
    display: flex;
    align-items: center;
  }

  .icon {
    margin-left: 0.5rem;
    height: 24px;
  }
}
</style>
