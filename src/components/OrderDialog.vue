<template>
  <v-dialog flat v-model="addOrderDialog" width="60%">
    <v-card>
      <v-layout>
        <v-flex wrap>
          <v-card>
            <v-card-title>
              <span class="headline">Create Order</span>
              <v-col class="text-right">
                <v-btn icon @click="$emit('cancel')">
                  <v-icon dark>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-card-title>
            <v-divider></v-divider>
            <v-form ref="form">
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-col cols="12" v-if="errorMessage">
                      <v-alert
                        color="error"
                        transition="scale-transition"
                        icon="mdi-alert"
                        outlined
                        class="text-xs-center"
                        style="border-radius: 5px"
                      >
                        <b>Order Exists</b>
                      </v-alert>
                    </v-col>

                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="userId"
                        label="User ID"
                        required
                        :rules="idRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
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
                        <v-date-picker
                          v-model="newDeliveryDate"
                          @change="deliveryDate = false"
                          no-title
                          scrollable
                        >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="address"
                        label="Delivery Address"
                        required
                        :rules="addressRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        :items="sizeList"
                        label="Size"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="quantity"
                        label="Quantity"
                        required
                        :rules="sizeRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                      <v-select
                        :items="methodList"
                        label="Payment Method"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4" right>
                      <span>Total Amount:</span>
                      {{paymentAmount}}
                    </v-col>
                  </v-layout>
                </v-container>
                <v-divider></v-divider>
                <br />
                <v-col class="text-right">
                  <v-btn dense id="button" @click="validate()">Save</v-btn>
                  <v-btn dense id="button" class="ml-4" @click="cancel()"
                    >Cancel</v-btn
                  >
                </v-col>
              </v-card-text>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    addOrderDialog: Boolean,
    errorMessage: Boolean,
    newDeliveryDate: String,
    deliveryDate: Boolean,
    date: String,
    userId: String,
    address: String,
    paymentMethod: String,
    paymentAmount: String,
    quantity: String,
    size: String,
    idRules: String,
    dateRules: String,
    addressRules: String,
    methodRules: String,
    amountRules: String,
    quantityRules: String,
    sizeRules: String,
  },
  emits: ["validate", "cancel"],
  data: () => ({
    sizeList: ["5kg", "10kg"],
    methodList: ["COD", "Khalti"]
  }),
  methods: {
    validate() {
      this.$emit("validate");
    },
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>