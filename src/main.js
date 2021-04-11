import { createApp } from 'vue'
import App from './App'
import store from './store'  // Same as './store/index.js'
import routes from './routes' // Same as './router/index.js'
import loadImage from './plugins/loadImage'
import 'bootstrap/dist/js/bootstrap.esm'

createApp(App)
  .use(store)
  .use(routes)
  .use(loadImage)
  .mount('#app')
