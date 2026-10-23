import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark', // 'system' | 'light' | 'dark'
  },
  components,
  directives
});

export default vuetify;