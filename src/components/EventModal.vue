<template>
  <div class="modal">
    <div
      class="overlay"
      @click="$emit('close')"
    ></div>
    <div class="wrapper">
      <div class="inner">
          <input
            class="textarea title"
            type="text"
            v-model="event.title"
          >
        <textarea
          class="textarea description"
          v-model="event.description"
        ></textarea>
        <p class="date">
          {{ event.date }}
        </p>
        <button
          @click="updateEvent"
          class="saveButton"
        >
          Save
        </button>
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
  methods: {
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
  background-color: rgba(0, 0, 0, 0.3);
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
}
.input,
.textarea {
  width: 100%;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #e0e0e0;
  resize: none;
  margin-bottom: 0.5rem;
}
.title {
  font-size: 1.1em;
}
.description {
  height: 200px;
}
.saveButton {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 10px 30px;
  border: 1px solid #e0e0e0;
}
.date {
  margin-bottom: 0.5rem;
}
</style>
