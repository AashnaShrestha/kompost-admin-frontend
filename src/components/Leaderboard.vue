<template>
  <v-data-table
    :headers="headers"
    :items="items"
    hide-default-footer 
  ></v-data-table>
</template>

<script>
export default {
    props: {
        headers: Array,
        items: Array
    }
};
</script>