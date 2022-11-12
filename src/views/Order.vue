<template>
  <v-container class="my-10">
    <v-dialog flat v-model="editStatus" width="60%">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Status</span>
          <v-col class="text-right">
            <v-btn icon @click="$emit('cancel')">
              <v-icon dark>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-select :items="statusOptions" v-model="changedStatus"></v-select>
        </v-card-text>
      </v-card>
    </v-dialog>
    <OrderDialog
      :addOrderDialog="addOrderDialog"
      @cancel="cancel"
      @validate="validation"
      :errorMessage="errorMessage"
      :userId="newOrder.userId"
      :newDeliveryDate="newOrder.deliveryDate"
      :deliveryDate="deliveryDate"
      :date="date"
      :address="newOrder.deliveryAddress"
      :paymentMethod="newOrder.paymentMethod"
      :paymentAmount="newOrder.paymentAmount"
      :quantity="newOrder.quantity"
      :size="newOrder.size"
      :edit="showEditDialog"
    ></OrderDialog>
    <OrderList
      :title="title"
      :create="showDialog"
      :buttonTitle="buttonTitle"
      :headers="headers"
      :tableItems="orders"
      :loader="loader"
    ></OrderList>
  </v-container>
</template>

<script>
import OrderService from "../services/OrderService.js";
import OrderList from "../components/DataListPage.vue";
// import DateTextField from "../components/DateTextField.vue";
import OrderDialog from "../components/OrderDialog.vue";
import moment from "moment";
export default {
  name: "Orders",
  data: () => ({
    headers: [
      { text: "Order ID", align: "left", sortable: true, value: "id" },
      { text: "User ID", align: "left", sortable: true, value: "userId" },
      { text: "Date", align: "left", sortable: true, value: "date" },
      {
        text: "Address",
        align: "left",
        sortable: true,
        value: "deliveryAddress",
      },
      {
        text: "Payment Method",
        align: "left",
        sortable: true,
        value: "paymentMethod",
      },
      {
        text: "Paid Status",
        align: "left",
        sortable: true,
        value: "paidStatusValue",
      },
      {
        text: "Amount",
        align: "left",
        sortable: true,
        value: "paymentAmount",
      },
      {
        text: "Quantity",
        align: "left",
        sortable: true,
        value: "quantity",
      },
      {
        text: "Status",
        align: "left",
        sortable: true,
        value: "status",
      },
    ],
    statusOptions: ["Delivered", "Pending", "Cancelled"],
    changedStatus:"",
    title: "Order Overview",
    buttonTitle: "Create Order",
    orders: [],
    newOrder: {
      userId: "",
      deliveryDate: "",
      deliveryAddress: "",
      quantity: "",
      size: "",
      paymentMethod: "",
      paymentAmount: "",
    },
    // changedStatus: "",
    deliveryDate: false,
    addOrderDialog: false,
    editStatus: false,
    nameRules: [(v) => !!v || "Name is required"],
    dateRules: [(v) => !!v || "Date is required"],
    phoneRules: [(v) => !!v || "Phone number is required"],
    addressRules: [(v) => !!v || "Address is required"],
    emailRules: [
      (v) => !!v || "Email is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    errorMessage: false,
    loader: true,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
  components: { OrderList, OrderDialog },
  created() {
    this.getOrderRecord();
  },
  beforeCreate() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/");
    }
  },
  watch: {
    "newOrder.size"() {
      if (this.newOrder.size && this.newOrder.quantity) {
        this.newOrder.paymentAmount =
          105 * this.newOrder.size * this.newOrder.quantity;
      }
    },
  },
  methods: {
    getOrderRecord() {
      OrderService.fetchOrderRecord().then((response) => {
        let requiredData = response;
        requiredData = requiredData.map((item) => {
          let date = moment(item.deliveryDate).format("YYYY-MM-DD");
          let paidStatusValue = "";
          if (item.paidStatus) {
            paidStatusValue = "Paid";
          } else {
            paidStatusValue = "Unpaid";
          }
          if (item.status) {
            return { statusValue: "Active", date, paidStatusValue, ...item };
          } else {
            return { statusValue: "Inactive", date, paidStatusValue, ...item };
          }
        });
        this.orders = requiredData;
        this.loader = false;
        console.log(this.orders);
      });
    },
    getOrderDetails(id) {
      this.$router.push(`/category/details/id=${id}`);
    },
    showEditDialog(){
      this.editStatus = true;
    },
    cancel() {
      // this.$refs.form.reset();
      this.addOrderDialog = false;
      this.errorMessage = false;
    },
    async createOrder() {
      let requiredObj = this.newOrder;
      console.log(requiredObj);
      const nameFound = this.orders.some(
        (obj) => obj.name === requiredObj.name
      );
      console.log(nameFound);
      if (nameFound) {
        this.errorMessage = true;
      } else {
        await OrderService.createOrder(requiredObj).then(() => {
          window.location.reload();
        });
        console.log("Success");
      }
    },
    showDialog() {
      this.addOrderDialog = true;
    },
    validation() {
      this.createOrder();
    },
  },
};
</script>
