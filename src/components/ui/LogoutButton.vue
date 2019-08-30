<template>
    <button
        class="logoutButton"
        @click="logout"
    >
        Logout
    </button>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.commit('auth/LOGOUT')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
