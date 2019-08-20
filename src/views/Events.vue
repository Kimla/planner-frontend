<template>
  <div class="events">
    <h1>Calendar</h1>

    <hr>

    <div>
      <p>Selected week: {{ week }} - {{ year }}</p>
      <div>
        <button @click="prevWeek">Prev week</button>
        <span> - </span>
        <button @click="nextWeek">Next week</button>
      </div>
    </div>

    <hr>

    <Fetch
      :url="apiUrl"
      @updated="items => events = items"
    >
      <Event
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
      <p v-if="events.length < 1">No events found</p>
    </Fetch>
  </div>
</template>

<script>
import Fetch from '@/components/Fetch.vue'
import Event from '@/components/Event.vue'
import getWeek from 'date-fns/getWeek'
import getYear from 'date-fns/getYear'
import getISOWeeksInYear from 'date-fns/getISOWeeksInYear'

export default {
  components: {
    Fetch,
    Event
  },
  data () {
    return {
      events: [],
      week: getWeek(new Date()),
      year: getYear(new Date())
    }
  },
  computed: {
    apiUrl () {
      return `https://test.kimlarsson.se/api/events/week/${this.week}/${this.year}`
    }
  },
  methods: {
    prevWeek () {
      if (this.week === 1) {
        const weeksPrevYear = getISOWeeksInYear(new Date(this.year - 1))
        this.week = weeksPrevYear
        this.year--
      } else {
        this.week--
      }
    },
    nextWeek () {
      const maxWeeks = getISOWeeksInYear(new Date(this.year))

      if (maxWeeks === this.week) {
        this.week = 1
        this.year++
      } else {
        this.week++
      }
    }
  }
}
</script>
