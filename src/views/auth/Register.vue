<template>
    <AuthWrapper>
        <AuthTop
            heading="Create your account"
            text="Enter your information to register a new account"
        />
        <AuthForm
            :form-data="formData"
            button-label="Sign up"
            endpoint="/register"
            @callback="login"
        >
            <FormGroup
                label="Name"
                label-for="name"
            >
                <InputField
                    v-model="formData.name"
                    :required="true"
                    name="name"
                    type="text"
                    autocomplete="name"
                />
            </FormGroup>
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
                label-for="password"
            >
                <InputField
                    v-model="formData.password"
                    :required="true"
                    name="password"
                    type="password"
                    autocomplete="new-password"
                />
            </FormGroup>
            <FormGroup
                label="Confirm password"
                label-for="password_confirmation"
            >
                <InputField
                    v-model="formData.password_confirmation"
                    :required="true"
                    name="password_confirmation"
                    type="password"
                    autocomplete="new-password"
                />
            </FormGroup>
        </AuthForm>
        <AuthLink
            label="Already have an account?"
            link="/login"
        />
    </AuthWrapper>
</template>

<script>
import AuthWrapper from '../../components/auth/AuthWrapper.vue'
import AuthForm from '../../components/auth/AuthForm.vue'
import AuthTop from '../../components/auth/AuthTop.vue'
import AuthLink from '../../components/auth/AuthLink.vue'
import FormGroup from '../../components/form/FormGroup.vue'
import InputField from '../../components/form/InputField.vue'

export default {
  metaInfo: {
    title: 'Register'
  },
  components: {
    AuthWrapper,
    AuthForm,
    AuthTop,
    AuthLink,
    FormGroup,
    InputField
  },
  data: () => ({
    formData: {
      name: null,
      email: null,
      password: null,
      password_confirmation: null
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
