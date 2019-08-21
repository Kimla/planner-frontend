<template>
  <div class="events">

    <header class="header">
      <h1 class="heading">Calendar</h1>
    </header>

    <div class="nav">
        <button
          @click="prevWeek"
          class="button"
        >
          <img
            src="../assets/images/chevron-left.svg"
            alt=""
            class="buttonIcon"
          >
        </button>

        <div class="selectedWeek">
          {{ week }} - {{ year }}
        </div>

        <button
          @click="nextWeek"
          class="button"
        >
          <img
            src="../assets/images/chevron-right.svg"
            alt=""
            class="buttonIcon"
          >
        </button>
    </div>

    <Fetch
      :url="apiUrl"
      @updated="items => events = items"
      class="eventList"
    >
      <div
        v-for="event in events"
        class="eventHolder"
        :key="event.id"
      >
        <Event :event="event" />
      </div>
      <p
        v-if="events.length < 1"
        class="noEventsFound"
      >
        No events found
      </p>
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
.nav {
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.eventList {
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
}
.eventHolder {
  width: 100%;
}
.button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.buttonIcon {
  width: 24px;
  height: 24px;
}
.selectedWeek {
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.25px;
  margin: 0 15px;
  margin-bottom: 2px;
}
.noEventsFound {
  font-size: 1.2rem;
  width: 100%;
  margin: 15px 0;
  text-align: center;
}
</style>
