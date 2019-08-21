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
        <Event :event="event" @open="openUpdateModal" />
      </div>
      <p
        v-if="events.length < 1"
        class="noEventsFound"
      >
        No events found
      </p>
    </Fetch>

    <TriggerAddEventButton @click.native="openCreateModal"/>

    <EventModal
      v-if="openEvent"
      :event="openEvent"
      :is-new="newEventOpen"
      @close="openEvent = false"
      @addEvent="addEvent"
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
import TriggerAddEventButton from '@/components/TriggerAddEventButton.vue'
import eventsRepository from '../repositories/eventsRepository'
import getISOWeek from 'date-fns/getISOWeek'
import getYear from 'date-fns/getYear'

export default {
  components: {
    WeekPicker,
    Fetch,
    Event,
    EventModal,
    TriggerAddEventButton
  },
  data () {
    return {
      events: [],
      date: false,
      openEvent: false,
      newEventOpen: false
    }
  },
  computed: {
    apiUrl () {
      if (!this.date) return false

      return eventsRepository.getByWeekUrl(this.date.week, this.date.year)
    }
  },
  methods: {
    openUpdateModal (event) {
      this.newEventOpen = false
      this.openEvent = { ...event }
    },
    openCreateModal () {
      this.newEventOpen = true
      this.openEvent = {}
    },
    getEventIndex (eventId) {
      const event = this.events.find(event => event.id === eventId)
      return this.events.indexOf(event)
    },
    isInCurrentDate (event) {
      const weekOfEvent = getISOWeek(new Date(event.date))
      const yearOfEvent = getYear(new Date(event.date))

      return weekOfEvent === this.date.week && yearOfEvent === this.date.year
    },
    addEvent (event) {
      if (this.isInCurrentDate(event)) {
        this.events.push(event)
        this.orderEvents()
      }
    },
    updateEvent (updatedEvent) {
      if (this.isInCurrentDate(updatedEvent)) {
        const index = this.getEventIndex(updatedEvent.id)
        this.events[index] = updatedEvent
        this.orderEvents()
      } else {
        this.deleteEvent(updatedEvent.id)
      }
    },
    deleteEvent (eventId) {
      const index = this.getEventIndex(eventId)

      this.events.splice(index, 1)
    },
    orderEvents () {
      this.events = this.events
        .sort((a, b) => new Date(a.date) - new Date(b.date) || b.id - a.id)
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
