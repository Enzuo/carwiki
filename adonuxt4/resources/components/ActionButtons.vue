<template>
  <div>
    <v-speed-dial
      v-if="actions.length > 1"
      bottom
      right
      fixed
      transition="slide-y-reverse-transition"
      direction="top"
    >
      <v-btn
        slot="activator"
        color="blue darken-2"
        fab
        dark
        hover
      >
        <v-icon>expand_less</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-btn v-for="(action, index) in actions" :key="index"
        color="action.color || blue"
        :loading="action.loading"
        dark fab small
        :disabled="action.disabled || false"
        @click="(action.click ? action.click() : null)"
        :to="action.to"
      >
        <v-icon>{{action.icon}}</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-btn v-else v-for="(action, index) in actions" :key="index"
      color="action.color || blue"
      :loading="action.loading"
      dark fab
      bottom
      right
      fixed
      :disabled="action.disabled || false"
      @click="action.click"
      :to="action.to"
    >
      <v-icon>{{action.icon}}</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    props:['actions']
  }
</script>

<style scoped>

</style>
