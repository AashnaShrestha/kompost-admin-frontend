<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2>{{ title }}</h2>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" md="4" sm="12" class="d-flex justify-md-end justify-sm-center">
        <v-text-field
          v-model="search"
          solo
          prepend-inner-icon="mdi-magnify"
          placeholder="Search"
          style="width: 80%"
          id="search"
          
        >
        </v-text-field>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12" md="4" sm="12" class="d-flex justify-md-end justify-sm-center">
        <v-btn id="button" tile @click="create" width="60%">
          <v-icon left>mdi-plus</v-icon>
          {{ buttonTitle }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :search="search"
          :headers="headers"
          :items="tableItems"
          item-key="id"
          class="elevation-1"
          :loading="loader"
        >
          <template v-slot:item.statusValue="{ item }">
            <v-chip
              id="chip"
              :class="item.statusValue"
              class="font-weight-bold"
              >{{ item.statusValue }}</v-chip
            >
          </template>
          <template v-slot:item.paidStatusValue="{ item }">
            <v-chip
              id="chip"
              :class="item.paidStatusValue"
              class="font-weight-bold"
              >{{ item.paidStatusValue }}</v-chip
            >
          </template>
          <template
            v-slot:item.action="{ item }"
            v-if="viewDetails"
          >
            <v-btn
            id="button"
              :class="`${item.condition}`"
              @click="$emit('getId', item.id)"
              :disabled="item.condition === 'pending'"
              >View Details</v-btn
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    create: { type: Function },
    title: String,
    buttonTitle: String,
    headers: Array,
    tableItems: Array,
    chipStatus: String,
    loader:Boolean,
    viewDetails: Boolean
  },
  data: () => ({
    search: "",
    valid: true,
    errorMessage: false,
  }),
  emits: ["edit"],
  methods: {
    cancel() {
      this.$refs.form.reset();
      this.props.dialog = false;
    },
    getId(id) {
      this.$emit("getId", id);
    },
    edit(){
      this.$emit("edit")
    }
  },
};
</script>