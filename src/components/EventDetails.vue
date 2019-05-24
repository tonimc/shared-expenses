<template>
  <div v-if="event" class="event">
    <div class="back" @click="$emit('close-event')">
      <h4>&lsaquo; Back to list</h4>
    </div>
    <div class="card">
      <div class="summary">
        <h2>{{ event.name }}</h2>
        <h3>Total: {{ totalAmount.toFixed(2) }} &#8364;</h3>
        <h3>Each person has to pay {{ dividedAmount.toFixed(2) }} &#8364;</h3>
      </div>
      <div class="list">
        <div class="header-list">
          <h4>Name</h4>
          <h4>Payed</h4>
          <h4>Has to...</h4>
        </div>
        <PersonData
          v-for="person in event.people"
          :key="person.email"
          :person="person"
          :amount="dividedAmount"
          @person-updated="updatePerson"
          @person-saved="savePerson"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PersonData from './PersonData';

export default {
  name: 'EventDetails',
  components: { PersonData },
  props: {
    event: {
      type: Object,
      default: null
    }
  },
  computed: {
    totalAmount() {
      return this.event.people.reduce(
        (amount, person) => amount + person.amount,
        0
      );
    },
    dividedAmount() {
      return this.totalAmount / this.event.people.length;
    }
  },
  methods: {
    editEvent(edited) {
      const index = this.event.people.findIndex(
        person => person.email === edited.email
      );
      if (index >= 0) {
        const event = { ...this.event };
        event.people.splice(index, 1, edited);
        return event;
      }
      return null;
    },
    updatePerson(person) {
      const event = this.editEvent(person);
      if (event) {
        this.$emit('event-updated', event);
      }
    },
    savePerson(person) {
      const event = this.editEvent(person);
      if (event) {
        this.$emit('event-saved', event);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.event {
  .card {
    border: 1px solid #4caf50;
    background-color: #e8f5e9;
    padding: 1rem;
  }

  .back {
    display: inline-flex;
    &:hover {
      cursor: pointer;
      color: #4caf50;
    }
  }
  .summary {
    display: flex;
    flex-direction: column;

    & > h3 {
      margin: 0.5rem 0;
    }
  }

  .list {
    margin-top: 2rem;

    .header-list {
      display: flex;
      padding-left: 80px;
      border-bottom: 1px solid black;

      & > * {
        width: 30%;
        margin: 0.5rem 0;
      }
    }
  }
}
</style>
