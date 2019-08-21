<template>
  <div class="events">

    <header class="header">
      <h1 class="heading">Calendar</h1>
    </header>

    <WeekPicker @dateChanged="newDate => date = newDate"/>

    <Fetch
      v-if="apiUrl"
      :url="apiUrl"
      @updated="items => events = items"
      class="eventList"
    >
      <div
        v-for="event in events"
        class="eventHolder"
        :key="event.id"
      >
        <Event :event="event" @open="event => openEvent = {...event}" />
      </div>
      <p
        v-if="events.length < 1"
        class="noEventsFound"
      >
        No events found
      </p>
    </Fetch>

    <EventModal
      v-if="openEvent"
      :event="openEvent"
      @close="openEvent = false"
      @updateEvent="updateEvent"
      @deleteEvent="deleteEvent"
    />
  </div>
</template>

<script>
import WeekPicker from '@/components/WeekPicker.vue'
import Fetch from '@/components/Fetch.vue'
import Event from '@/components/Event.vue'
import EventModal from '@/components/EventModal.vue'

export default {
  components: {
    WeekPicker,
    Fetch,
    Event,
    EventModal
  },
  data () {
    return {
      events: [],
      date: false,
      openEvent: false
    }
  },
  computed: {
    apiUrl () {
      if (!this.date) return false

      return `https://test.kimlarsson.se/api/events/week/${this.date.week}/${this.date.year}`
    }
  },
  methods: {
    getEventIndex (eventId) {
      const event = this.events.find(event => event.id === eventId)
      return this.events.indexOf(event)
    },
    async updateEvent (updatedEvent) {
      if (updatedEvent) {
        const index = this.getEventIndex(updatedEvent.id)
        this.events[index] = updatedEvent
      }

      this.openEvent = false
    },
    async deleteEvent (eventId) {
      const index = this.getEventIndex(eventId)

      this.events.splice(index, 1)

      this.openEvent = false
    }
  }
}
</script>

<style scoped>
.header {
  border-bottom: 1px solid #e0e0e0;
  padding: 15px;
}
.heading {
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.25px;
  text-align: center;
}
.eventList {
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
}
.eventHolder {
  width: 100%;
}
.noEventsFound {
  font-size: 1.2rem;
  width: 100%;
  margin: 15px 0;
  text-align: center;
}
</style>
