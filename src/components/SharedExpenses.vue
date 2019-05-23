<template>
  <div class="shared-expenses">
    <div v-if="isLoading" class="loading"><h1>Loading...</h1></div>
    <div v-else>
      <div class="score-bar">
        <h3>Events: {{ totalEvents }}</h3>
        <h3>People: {{ totalPeople }}</h3>
        <h3>Money: {{ totalMoney }} &#8364;</h3>
      </div>
      <EventsList
        v-if="!event"
        :events="events"
        @selected-event="selectedEvent"
      ></EventsList>
      <EventDetails v-else :event="event"></EventDetails>
    </div>
  </div>
</template>

<script>
import { eventsRepository } from '../data/EventsRepository';

import EventsList from './EventsList';
import EventDetails from './EventDetails';

export default {
  name: 'SharedExpenses',
  components: { EventsList, EventDetails },
  data: function() {
    return {
      isLoading: false,
      events: [],
      event: null
    };
  },
  computed: {
    totalEvents() {
      return this.events.length;
    },
    totalMoney() {
      let money = 0;
      this.events.forEach(event => {
        event.people.forEach(person => {
          money += person.amount;
        });
      });
      return money;
    },
    totalPeople() {
      let people = 0;
      this.events.forEach(event => {
        people += event.people.length;
      });
      return people;
    }
  },
  created() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      this.isLoading = true;
      setTimeout(async () => {
        this.events = (await eventsRepository.all()).data;
        this.isLoading = false;
      }, 2000);
    },
    selectedEvent(event) {
      this.event = event;
    },
    updateEvent(updated) {
      const index = this.events.findIndex(event => event.id === updated.id);
      if (index) {
        this.events.splice(index, 1, updated);
        eventsRepository.update(updated);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.shared-expenses {
  padding: 2rem 5rem;

  .loading {
    text-align: center;
    margin: 5rem;
  }
  .score-bar {
    display: flex;
    justify-content: flex-end;

    > h3 {
      margin-left: 3rem;
    }
  }
}
</style>
