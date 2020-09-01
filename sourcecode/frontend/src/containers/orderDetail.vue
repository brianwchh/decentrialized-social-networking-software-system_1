<template>

<div id="component_root">
  <table>
    <tr>
      <th>order_id</th>
      <th>status</th>
      <th>item_name</th>
      <th>item_id</th>
      <th>amount</th>
      <th>price</th>
      <th>user_id</th>
      <th>sub_total_price</th>
      <th>total_price</th>
    </tr>
    <tr v-for="(orderItem,index) in orderArray" :key="index">
      <td>{{$route.params.orderId}}</td>
      <td>{{orderItem.status}}</td>
      <td>{{orderItem.item_name}}</td>
      <td>{{orderItem.item_id}}</td>
      <td>{{orderItem.item_cnt}}</td>
      <td>{{orderItem.price}}</td>
      <td>{{orderItem.user_id}}</td>
      <td>{{orderItem.sub_total_price}}</td>
      <td>{{orderItem.total_price}}</td>
    </tr>
  </table>

  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="primary" v-on:click="handleCheckOut">pay</v-btn>
    <v-spacer></v-spacer>
  </v-card-actions>

</div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex' ;
// import { debug_ } from '../global_config';
// import {debug_,config_json} from '../global_config' ;
// import {itemEndPoint} from '../ipconfig' ;
// import axios from 'axios' ;

export default {
  name: 'orderDetail',
  components: {
    
  },

   data: () => ({
        orderArray :  '',
    }),

    async created () {

      console.log(this.$route.params)
      const order_id = this.$route.params.orderId ;
      const payload = {
        order_id : order_id
      }
      await this.getOrderDetailAction(payload);
      this.orderArray = this.getOrderArray

    },

    computed : {
      ...mapGetters({
          getOrderArray : 'getOrderArray' ,
      }),
    },

    watch: {


    },

    methods: {

      ...mapActions({
        getOrderDetailAction : 'getOrderDetailAction' ,
      }),



      async handleCheckOut(){
        
        alert('not implemented yet .... ')

      }

    },

}
</script>


<style scoped>

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  font-size: calc(0.3em + 0.8vw);
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-size: calc(0.3em + 0.8vw);
}

tr:nth-child(even) {
  background-color: #dddddd;
}

</style>