import {appStarted} from "shared/config/init";
import {createApp} from "vue";
import App from "../ui/App.vue";

appStarted()

const app = createApp(App)

app.mount('#app')