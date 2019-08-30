<template>
    <AuthWrapper>
        <AuthTop
            heading="Welcome back!"
            text="Enter your account details to log in"
        />
        <AuthForm
            :form-data="formData"
            button-label="Log in"
            endpoint="/login"
            @callback="login"
        >
            <FormGroup
                label="Email address"
                label-for="email"
            >
                <InputField
                    v-model="formData.email"
                    :required="true"
                    name="email"
                    type="email"
                    autocomplete="email"
                />
            </FormGroup>
            <FormGroup
                label="Password"
                label-for="Password"
            >
                <InputField
                    v-model="formData.password"
                    :required="true"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                />
            </FormGroup>
        </AuthForm>
        <AuthLink
            label="Forgot your password?"
            link="/password/forgot"
        />
    </AuthWrapper>
</template>

<script>
import AuthWrapper from '../../components/auth/AuthWrapper.vue'
import AuthForm from '../../components/auth/AuthForm.vue'
import AuthLink from '../../components/auth/AuthLink.vue'
import AuthTop from '../../components/auth/AuthTop.vue'
import FormGroup from '../../components/form/FormGroup.vue'
import InputField from '../../components/form/InputField.vue'

export default {
  components: {
    AuthWrapper,
    AuthForm,
    AuthLink,
    AuthTop,
    FormGroup,
    InputField
  },
  data: () => ({
    formData: {
      email: null,
      password: null
    }
  }),
  methods: {
    async login (data) {
      this.$store.dispatch('auth/saveToken', {
        token: data.token,
        remember: true
      })
      await this.$store.dispatch('auth/fetchUser')
      this.$router.push({ name: 'events' })
    }
  }
}
</script>
