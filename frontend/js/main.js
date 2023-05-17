const vue = require('vue');

import '../scss/main.scss';
import RegistrationForm from '../components/RegistrationForm.vue';

const app = vue.createApp({
  components: {
    RegistrationForm,
  },
  mounted() {
    this.$el.parentNode.style.display = 'block';
  }
});

app.mount('#app');

