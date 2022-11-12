<template>
  <v-menu
    ref="deliveryDate"
    v-model="deliveryDate"
    :close-on-content-click="false"
    :return-value.sync="date"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="newDeliveryDate"
        label="Delivery Date"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
        :rules="dateRules"
      ></v-text-field>
    </template>
    <v-date-picker v-model="newDeliveryDate" @change="deliveryDate = false" no-title scrollable>
      <!-- <v-spacer></v-spacer>
      <v-btn text @click="deliveryDate = false"> Cancel </v-btn>
      <v-btn text @click="save(date)"> OK </v-btn> -->
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  props: {
    newDeliveryDate: String,
    dateRules: String,
  },
  data: () => ({
    deliveryDate: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
  methods: {
    save(date){
        this.$refs.menu.save(date);
    }
  }
};
</script>