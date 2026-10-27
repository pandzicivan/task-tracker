import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#1867C0',
          secondary: '#03DAC6',
          error: '#CF6679',
          accent: '#FF4081',
          info: '#2196F3',
          background: '#121212',
          surface: '#1E1E1E',
        },
      },
    },
  },
  components,
  directives,
});

export default vuetify;