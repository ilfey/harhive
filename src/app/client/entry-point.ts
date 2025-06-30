import {appStarted} from "shared/config/init";
import "../styles/index.scss"
import "generated/styles.css"
import {createApp} from "vue";
import App from "../ui/App.vue";
import MasonryWall from '@yeger/vue-masonry-wall';

appStarted()

const app = createApp(App)

app.use(MasonryWall)

app.mount('#app')