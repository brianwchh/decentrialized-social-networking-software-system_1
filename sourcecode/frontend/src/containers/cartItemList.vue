<template>

<div id="component_root">
  <table>
    <tr>
      <th>item_name</th>
      <th>item_id</th>
      <th>isSelected</th>
      <th>item_cnt</th>
      <th>order_id</th>
      <th>price</th>
      <th>user_id</th>
      <th>total_price</th>
    </tr>
    <tr v-for="(cartitem,index) in cartItemArray" :key="index">
      <td>{{cartitem.item_name}}</td>
      <td>{{cartitem.item_id}}</td>
      <td>{{cartitem.isSelected}}</td>
      <td>{{cartitem.item_cnt}}</td>
      <td>{{cartitem.order_id}}</td>
      <td>{{cartitem.price}}</td>
      <td>{{cartitem.user_id}}</td>
      <td>{{cartitem.total_price}}</td>
    </tr>
  </table>

  <v-select
          v-model="selectedAddress"
          :items="addressList"
          menu-props="auto"
          label="Select"
          hide-details
          single-line
          placeholder="please select an address from drop down"
  ></v-select>

  <v-text-field
          v-model="newAddress"
          label="NewAddress"
          placeholder="Or input a new address here"
        ></v-text-field>

  <v-card-actions>
    <v-spacer></v-spacer>
    <v-btn color="primary" v-on:click="handleCheckOut">CheckOut</v-btn>
    <v-spacer></v-spacer>
  </v-card-actions>

</div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex' ;
import { debug_ } from '../global_config';
// import {debug_,config_json} from '../global_config' ;
// import {itemEndPoint} from '../ipconfig' ;
// import axios from 'axios' ;

export default {
  name: 'cartItemList',
  components: {
    
  },

   data: () => ({
     cartItemArray : [],
     selectedAddress: '',
     newAddress : '' ,
     addressList : [

     ]
    }),

    async created () {
      const token = localStorage.getItem('token');
      const payload = {
        token: token
      }
      await this.getCartItemsAction(payload);
      this.cartItemArray = this.getCartItems ;
      await this.getAddressByUserIdAction();
      this.getAddressList();
    },

    computed : {
      ...mapGetters({getCartItems: 'getCartItems',
                    getCartItemNumber : 'getCartItemNumber',
                    getAddressArray : 'getAddressArray',
                    getOrderId : 'getOrderId' ,
      }),
    },

    watch: {
      getCartItemNumber : function() { 
        console.log('getCartItemNumber :',this.getCartItemNumber);
        this.cartItemArray = this.getCartItems ;

      },

    },

    methods: {

      ...mapActions({
        getCartItemsAction: 'getCartItemsAction',
        addNewAddressAction: 'addNewAddressAction',
        getAddressByUserIdAction : 'getAddressByUserIdAction',
        insertOrderAction : 'insertOrderAction'
      }),

      getAddressList () {
        const addrArr = this.getAddressArray;
        const len = addrArr.length ;
        let i = 0;
        for(i=0; i<len; i++){
          this.addressList.push(addrArr[i].addressField) ;
        }
      },

      async handleCheckOut(){
        console.log('hello check out, new address :' , this.newAddress);

        const token = localStorage.getItem('token');

        let address_2_shown_on_order ;

        if(!this.newAddress && !this.selectedAddress){
          alert('please input new address, or select one')
          return ;
        }

        if(this.newAddress) {
        // create new address
          const payload = {
            token: token ,
            addressField: this.newAddress,
            isDefault: false
          }
          await this.addNewAddressAction(payload);
          address_2_shown_on_order = this.newAddress ;
        } else {
          address_2_shown_on_order = this.selectedAddress ;
        }
        
        // create new order lah ......
        // insertOrder(user_id,address,total_price,status))
        const len = this.cartItemArray.length ;
        let i=0;
        let total_sum_price  = 0 ; 
        for(i=0; i<len; ++i){
          if(debug_){
            console.log("total price : ", Number(this.cartItemArray[i].total_price))
          }
          total_sum_price += Number(this.cartItemArray[i].total_price) ;
        }
        let payload = {
          address : address_2_shown_on_order ,
          total_price :  total_sum_price ,
          status : 0,
          cartItemsToBuy : this.cartItemArray , 
        }
        console.log('checking cartItemArray : ', this.cartItemArray);
        console.log(payload.cartItemsToBuy)
        await this.insertOrderAction(payload);
        await this.getCartItemsAction();

        this.$router.push(`/order/${this.getOrderId}`);

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