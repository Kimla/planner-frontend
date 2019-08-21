<template>
  <div class="modal">
    <div
      class="overlay"
      @click="$emit('close')"
    ></div>
    <div class="wrapper">
      <div class="inner">
        <form @submit.prevent="submitHandler">
          <input
            class="textarea title"
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
          <p class="date">
            {{ event.date }}
          </p>
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
export default {
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
    submitHandler () {
      if (this.isNew) {
        this.createEvent()
      } else {
        this.updateEvent()
      }
    },
    async createEvent () {
      let res = await fetch('https://test.kimlarsson.se/api/events', {
        method: 'POST',
        body: JSON.stringify({
          ...this.newEvent,
          date: '2019-08-21'
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      res = await res.json()

      this.$emit('addEvent', res)
    },
    async updateEvent () {
      let res = await fetch(`https://test.kimlarsson.se/api/events/${this.newEvent.id}`, {
        method: 'PUT',
        body: JSON.stringify(this.newEvent),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      res = await res.json()

      this.$emit('updateEvent', res)
    },
    async deleteEvent () {
      await fetch(`https://test.kimlarsson.se/api/events/${this.newEvent.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      this.$emit('deleteEvent', this.newEvent.id)
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
  display: flex;
  align-items: center;
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
  max-height: 100%;
  padding: 15px;
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
.input,
.textarea {
  width: 100%;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  resize: none;
  margin-bottom: 0.6rem;
}
.title {
  font-size: 1.1em;
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
