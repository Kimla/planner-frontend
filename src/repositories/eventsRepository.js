const baseUrl = 'https://test.kimlarsson.se/api'
const resource = `${baseUrl}/events`

export default {
  getByWeekUrl (week, year) {
    return `${resource}/week/${week}/${year}`
  },

  async getByWeek (week, year) {
    const response = await fetch(this.getByWeekUrl(week, year))
    const res = await response.json()

    return res
  },

  async getByDate (date) {
    const response = await fetch(`${resource}/date/${date}`)
    const res = await response.json()

    return res
  },

  async create (event) {
    let res = await fetch(resource, {
      method: 'POST',
      body: JSON.stringify({
        ...event,
        date: '2019-08-21'
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    res = await res.json()

    return res
  },

  async update (event) {
    let res = await fetch(`${resource}/${event.id}`, {
      method: 'PUT',
      body: JSON.stringify(event),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    res = await res.json()

    return res
  },

  async delete (eventId) {
    let res = await fetch(`${resource}/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    res = await res.json()

    return res
  }
}
