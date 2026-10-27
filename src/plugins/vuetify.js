import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const savedTheme = localStorage.getItem("theme") || "dark";

const vuetify = createVuetify({
  theme: {
    defaultTheme: savedTheme,
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#1E1E1E',
          secondary: '#03DAC6',
          error: '#CF6679',
          accent: '#FF4081',
          info: '#2196F3',
          background: '#121212',
          surface: '#1E1E1E',
        },
      },
      light: {
        dark: false,
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          background: '#FFFFFF',
          surface: '#FFFFFF',
        },
      },
    },
  },
  components,
  directives,
});

export default vuetify;