<template lang="pug">
  .text-xs-center
    v-dialog(v-model="toogle" width="500")
      v-card
        v-toolbar(color="secondary" dark)
          v-toolbar-title
            slot(name="title") Advertencia
        v-card-text
          slot(name="content")
        v-divider
        v-card-actions
          v-spacer
          slot(name="action")
</template>

<script>
export default {
  props: { toogle: Boolean }
}
</script>
