<template>
  <div class="weekPicker">
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
</template>

<script>
import getWeek from 'date-fns/getWeek'
import getYear from 'date-fns/getYear'
import getISOWeeksInYear from 'date-fns/getISOWeeksInYear'

export default {
  data () {
    return {
      week: null,
      year: null
    }
  },
  created () {
    const { year, week } = this.$route.query

    if (year && week) {
      this.week = week
      this.year = year
    } else {
      this.week = getWeek(new Date())
      this.year = getYear(new Date())
    }

    this.emitDateChanged()
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

      this.dateChanged()
    },
    nextWeek () {
      const maxWeeks = getISOWeeksInYear(new Date(this.year))

      if (maxWeeks === this.week) {
        this.week = 1
        this.year++
      } else {
        this.week++
      }

      this.dateChanged()
    },
    dateChanged () {
      this.updateUrl()
      this.emitDateChanged()
    },
    updateUrl () {
      this.$router.replace({
        name: 'events',
        query: {
          week: this.week,
          year: this.year
        }
      })
    },
    emitDateChanged () {
      this.$emit('dateChanged', {
        week: this.week,
        year: this.year
      })
    }
  }
}
</script>

<style scoped>
.weekPicker {
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
