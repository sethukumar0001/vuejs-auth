<template lang="">
    <div>
        <br />
        <form @submit.prevent="onSubmit(email,password)">
            <input type="text" v-model="email" placeholder="Email" /><br />
            <input type="text" v-model="password" placeholder="Password" /><br />
            <button>SignIn</button>
        </form>
        <br />
    </div>
</template>
<script>
import { LOGIN } from "../store/actions.type";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    onSubmit(email, password) {
      this.$store
         .dispatch(LOGIN, { email, password })
        .then(() => this.$router.push({ name: "home" }));
    },
  },
  
};
</script>
<style lang="">
</style>