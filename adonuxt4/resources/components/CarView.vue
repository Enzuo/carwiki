<template>
  <div>
    Name : {{car.name}}
    <v-flex xs6 >
    <v-card xs6 >
      <v-card-title>
        <h3><v-icon>fullscreen</v-icon> Dimensions </h3>
      </v-card-title>
      <v-card-content>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-container>
                <v-layout row wrap>
                  <v-flex 6>
                    <v-list-tile-title>Length</v-list-tile-title>
                  </v-flex>
                  <v-flex 6>
                    <v-list-tile-title>{{car.lengthmm}}</v-list-tile-title>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-action-text>mm</v-list-tile-action-text>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title >Width</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title>{{car.width}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-action-text>mm</v-list-tile-action-text>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title >Height</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title>{{car.height}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-action-text>mm</v-list-tile-action-text>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title >Weightalot</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-content>
              <v-list-tile-title>{{car.weight}}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-list-tile-action-text>kg</v-list-tile-action-text>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card-content>
    </v-card>
    </v-flex>
  </div>
</template>

<script>
  export default {
    props : ['car'],
  }
</script>

<style scoped>

</style>
