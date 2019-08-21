<template>
  <div class="modal">
    <div
      class="overlay"
      @click="close"
    ></div>
    <div class="wrapper">
      <div class="inner">
        <form @submit.prevent="submitHandler">
          <Datepicker
            v-model="event.date"
            placeholder="Date..."
            input-class="input"
          />
          <input
            class="input"
            type="text"
            v-model="event.title"
            placeholder="Title..."
            required
          >
          <textarea
            class="textarea description"
            placeholder="Description..."
            v-model="event.description"
          ></textarea>
          <div class="buttons">
            <button
              v-if="!isNew"
              type="button"
              @click="deleteEvent"
              class="button deleteButton"
            >
              Delete
            </button>
            <button
              type="submit"
              class="button saveButton"
            >
              {{ buttonLabel }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import eventsRepository from '../repositories/eventsRepository'
import Datepicker from 'vuejs-datepicker'

export default {
  components: {
    Datepicker
  },
  props: {
    event: {
      type: Object,
      required: true
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      newEvent: false
    }
  },
  created () {
    this.newEvent = this.event
  },
  computed: {
    buttonLabel () {
      return this.isNew ? 'Create' : 'Save'
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    submitHandler () {
      if (this.isNew) {
        this.createEvent()
      } else {
        this.updateEvent()
      }
    },
    async createEvent () {
      const res = await eventsRepository.create(this.newEvent)

      this.$emit('addEvent', res)
      this.close()
    },
    async updateEvent () {
      const res = await eventsRepository.update(this.newEvent)

      this.$emit('updateEvent', res)
      this.close()
    },
    async deleteEvent () {
      await eventsRepository.delete(this.newEvent.id)

      this.$emit('deleteEvent', this.newEvent.id)
      this.close()
    }
  }
}
</script>

<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}
.overlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #e5e5e5;
  opacity: 0.75;
}
.wrapper {
  overflow: auto;
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
}
.inner {
  padding: 20px 12px;
  border-radius: 8px;
  background-color: #fff;
  width: 100%;
  position: relative;
  margin: auto;
  box-shadow: 0 1px 6px 0 rgba(60, 64, 67, 0.302),
    0 1px 6px 1px rgba(60, 64, 67, 0.149);
}
.modal >>> .input,
.textarea {
  width: 100%;
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  resize: none;
  margin-bottom: 0.6rem;
}
.description {
  height: 200px;
}
.buttons {
  display: flex;
  justify-content: space-between;
}
.button {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 10px 30px;
  border: 1px solid #e0e0e0;
}
.deleteButton {
  background-color: #f44336;
  color: #fff;
}
.saveButton {
  margin-left: auto;
}
.date {
  margin-bottom: 1.2rem;
}
</style>
