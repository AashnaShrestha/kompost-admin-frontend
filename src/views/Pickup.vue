<template>
  <v-container class="my-10">
    <PickupDialog
      :addPickupDialog="addPickupDialog"
      :errorMessage="errorMessage"
      :newPickupDate="newPickupDate"
      :pickupDate="pickupDate"
      :date="date"
      :userId="newPickup.userId"
      :address="newPickup.address"
      :weight="newPickup.weight"
    ></PickupDialog>
    <PickupList
      :title="title"
      :create="showDialog"
      :buttonTitle="buttonTitle"
      :headers="headers"
      :tableItems="pickups"
      :loader="loader"
    ></PickupList>
  </v-container>
</template>

<script>
import PickupService from "../services/PickupService.js";
import PickupList from "../components/DataListPage.vue";
// import DateTextField from "../components/DateTextField.vue";
import PickupDialog from "../components/PickupDialog.vue";
import moment from "moment";
export default {
  name: "Pickups",
  data: () => ({
    headers: [
      { text: "Pickup ID", align: "left", sortable: true, value: "id" },
      { text: "User ID", align: "left", sortable: true, value: "userId" },
      { text: "Pickup Date", align: "left", sortable: true, value: "date" },
      {
        text: "Pickup Time",
        align: "left",
        sortable: true,
        value: "pickupTime",
      },
      {
        text: "Address",
        align: "left",
        sortable: true,
        value: "address",
      },
      {
        text: "Weight (kg)",
        align: "left",
        sortable: true,
        value: "weight",
      },
      {
        text: "Status",
        align: "left",
        sortable: true,
        value: "status",
      },
    ],
    statusOptions: ["Delivered", "Pending", "Cancelled"],
    changedStatus: "",
    title: "Pickup Overview",
    buttonTitle: "Create Pickup",
    pickups: [],
    newPickup: {
      userId: "",
      deliveryDate: "",
      deliveryAddress: "",
      quantity: "",
      size: "",
      paymentMethod: "",
      paymentAmount: "",
    },
    deliveryDate: false,
    addPickupDialog: false,
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
  components: { PickupList, PickupDialog },
  created() {
    this.getPickupRecord();
  },
  beforeCreate() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/");
    }
  },
  watch: {
    "newPickup.size"() {
      if (this.newPickup.size && this.newPickup.quantity) {
        this.newPickup.paymentAmount =
          105 * this.newPickup.size * this.newPickup.quantity;
      }
    },
  },
  methods: {
    getPickupRecord() {
      PickupService.fetchPickupRecord().then((response) => {
        let requiredData = response;
        requiredData = requiredData.map((item) => {
          let date = moment(item.pickupDate).format("YYYY-MM-DD");
          return { date, ...item };
        });
        this.pickups = requiredData;
        this.loader = false;
        console.log(this.pickups);
      });
    },
    getPickupDetails(id) {
      this.$router.push(`/category/details/id=${id}`);
    },
    showEditDialog() {
      this.editStatus = true;
    },
    cancel() {
      // this.$refs.form.reset();
      this.addPickupDialog = false;
      this.errorMessage = false;
    },
    async createPickup() {
      let requiredObj = this.newPickup;
      console.log(requiredObj);
      const nameFound = this.pickups.some(
        (obj) => obj.name === requiredObj.name
      );
      console.log(nameFound);
      if (nameFound) {
        this.errorMessage = true;
      } else {
        await PickupService.createPickup(requiredObj).then(() => {
          window.location.reload();
        });
        console.log("Success");
      }
    },
    showDialog() {
      this.addPickupDialog = true;
    },
    validation() {
      this.createPickup();
    },
  },
};
</script>
