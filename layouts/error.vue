<template>
  <div class="login flex items-center justify-center min-h-screen bg-white">
    <div class="px-8 py-6 mt-4 text-left w-10/12 md:w-6/12 lg:w-4/12">
      <h1 class="font-mono text-primary-dark text-center z-50 text-6xl">
        {{ error.statusCode }} It Seems you are lost?
      </h1>

      <div class="mt-7">
        <NuxtLink to="/">
          <Button class="w-full" text-label="Ir para home" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script>
import Button from '@/components/Buttons/Button.vue'
export default {
  name: 'ErrorPage',
  components: {
    Button,
  },
  layout: 'error',
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
}
</script>
