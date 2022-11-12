<template>
  <v-container fluid class="pa-12">
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="4">
        <DashboardStatistics
          title="Total Orders"
          icon="mdi-cart-heart"
          total="1500"
        ></DashboardStatistics>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <DashboardStatistics
          title="Total Pickup"
          icon="mdi-delete-empty"
          total="2200"
        ></DashboardStatistics>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="4">
        <DashboardStatistics
          title="Total Users"
          icon="mdi-account-group-outline"
          total="200"
        ></DashboardStatistics>
      </v-col>
    </v-row>
    <v-row height="100 vh">
      <v-col cols="12" md="4">
        <v-card style="height: 335px" class="scroll">
          <v-card-title class="d-flex align-center justify-center"
            >Leaderboard</v-card-title
          >
          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <h3 class="d-flex align-center justify-center">Top Sellers</h3>
                <Leaderboard
                  :headers="headers"
                  :items="topSellerList"
                ></Leaderboard>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="pa-5" style="height: 335px">
          <lines
            :chart-data="chartData"
            :chart-options="chartOptions"
            :height="150"
          ></lines>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashboardStatistics from "../components/DashboardStatistics.vue";
import Leaderboard from "../components/Leaderboard.vue";
import { Line } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);
export default {
  name: "Home",
  data: () => ({
    headers: [
      { text: "Name", align: "left", sortable: true, value: "name" },
      { text: "Quantity", align: "left", sortable: true, value: "quantity" },
    ],
    topSellerList: [
      { name: "Botanical Garden", quantity: "1000 kg" },
      { name: "Kalimati Market", quantity: "875 kg" },
      { name: "National Agricultural Research Council", quantity: "640 kg" },
      { name: "Balkhu Tarkari Bazaar", quantity: "530 kg" },
      { name: "Pratik Amatya", quantity: "335 kg" },
    ],
    topBuyerList: [
      { name: "Botanical Garden", quantity: "1000 kg" },
      { name: "Kalimati Market", quantity: "875 kg" },
      { name: "National Agricultural Research Council", quantity: "640 kg" },
      { name: "Balkhu Tarkari Bazaar", quantity: "530 kg" },
      { name: "Pratik Amatya", quantity: "335 kg" },
    ],
    chartData: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Orders",
          borderColor: "#0087ff",
          backgroundColor: "#0087ff",
          fill: false,
          data: [90, 80, 230, 250, 190, 227, 250],
          tension: 0.1,
        },
        {
          label: "Pickup Quantity (kg)",
          borderColor: "#f3a109",
          backgroundColor: "#f3a109",
          fill: false,
          data: [50, 200, 190, 185, 200, 350],
          tension: 0.1,
        },
      ],
    },
  }),
  created() {},
  mounted() {},
  methods: {},
  components: { DashboardStatistics, Leaderboard, lines: Line },
};
</script>

<style scoped>
.scroll {
  overflow-y: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  margin-top: 40px;
    margin-bottom: 40px;
  border-radius: 8px;
  background: #ebebeb;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background: #bbb;
}
</style>