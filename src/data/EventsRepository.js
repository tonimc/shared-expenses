import axios from 'axios';

const EVENT_RESOURCE = 'events';

class EventsRepository {
  constructor() {
    console.log('EventsRepository', process.env.VUE_APP_API_URL);
    this.http = axios.create({ baseURL: process.env.VUE_APP_API_URL });
  }

  all() {
    return this.http.get(`/${EVENT_RESOURCE}`);
  }

  update(event) {
    return this.http.put(`/${EVENT_RESOURCE}/${event.id}`, event);
  }
}

const eventsRepository = new EventsRepository();

export { eventsRepository };
