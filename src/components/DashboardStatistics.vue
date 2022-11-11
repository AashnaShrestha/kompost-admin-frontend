<template>
  <v-card>
    <v-card-title>{{title}}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="6">
            <div class="icon">
                <v-icon style="color: rgb(102, 108, 255)">{{icon}}</v-icon>
            </div>
          
        </v-col>
        <v-col cols="6" align="right"><h2>{{total}}</h2></v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
    props: {
        title: String,
        icon: String,
        total: String
    }
}
</script>

<style scoped>
.icon{
    display: flex;
    align-content: center;
    justify-content: center;
    border-radius: 8px;
    height: 40px;
    width: 40px;
    background-color: rgba(102, 108, 255, 0.12);
}
</style>