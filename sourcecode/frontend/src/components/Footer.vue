<template>
  <v-footer
    app
    absolute
    dark
    padless
    inset
    width="100%"
  >
    <v-card
      flat
      tile
      width="100%"
      color="black"
      
    >
      <v-card-text class="text-center">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4 white--text"
          icon
        >
        <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

    </v-card>
  </v-footer>
</template>


<script>
  export default {
    data: () => ({
      name : 'Footer' ,
      icons: [

      ],
    }),
  }
</script>

