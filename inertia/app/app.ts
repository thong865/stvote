/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css';
import { createSSRApp, h } from 'vue'
import type { DefineComponent } from 'vue'
import DefaultLayout from '~/layouts/default.vue';
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,
  resolve: async (name: string) => {
    const page = await resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>("../pages/**/*.vue")
    )

    page.default.layout = page.default.layout || DefaultLayout

    return page
  },

  setup({ el, App, props, plugin }) {

    createSSRApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})