import axios from 'axios'

const resource = '/events'

export default {
  getByWeekUrl (week, year) {
    return `${resource}/week/${week}/${year}`
  },

  async getByWeek (week, year) {
    const res = await axios(this.getByWeekUrl(week, year))

    return res.data
  },

  async getByDate (date) {
    const res = await axios(`${resource}/date/${date}`)

    return res.data
  },

  async create (event) {
    const res = await axios.post(resource, event)

    return res.data
  },

  async update (event) {
    const res = await axios.put(`${resource}/${event.id}`, event)

    return res.data
  },

  async delete (eventId) {
    const res = await axios.delete(`${resource}/${eventId}`)

    return res
  }
}
