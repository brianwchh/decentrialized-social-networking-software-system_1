<template>

<div id="root">

  <div id="inputform">
    <div id="inputField">
      <label id="item_name_label" for="item_name">item_name:</label><br>
      <input id="item_name" type="text" v-model="item_name" placeholder="input the item's name"><br>
      <label id="market_price_label" for="market_price">market_price:</label><br>
      <input type="text" id="market_price" v-model="market_price" placeholder="input the market price"><br>
      <label for="price">price:</label><br>
      <input type="text" id="price" v-model="price" placeholder="input the price"><br>  
    </div>
      
    
    <input id="submit" type="submit" value="Next" v-on:click="handle_submit">
  </div>
  
</div>


</template>

<script>
// import {mapGetters, mapActions} from 'vuex' ;
import {debug_,config_json} from '../global_config' ;
import {itemEndPoint} from '../ipconfig' ;
import axios from 'axios' ;

export default {
  name: 'AddNewItem',
  components: {
    
  },

   data: () => ({
     item_name : '',
     market_price : '',
     price : '',
      
    }),

    created () {

    },

    computed : {
      // ...mapGetters(['getLoginStatus']),
      // ...mapGetters({getLoginStatus: 'getLoginStatus'}),
    },

    methods: {
                       
      // ...mapActions({
      //   login: 'login'
      // }),

      async handle_submit ( ) {
        if(debug_){
          console.log(this.item_name,this.market_price,this.price);
        }

        const token = localStorage.getItem('token');

        const formDataObj = {
          item_name: this.item_name,
          market_price: this.market_price ,
          price: this.price,
        }

        if(debug_) {
          console.log(JSON.stringify(formDataObj));
        }

        let itemId  = '';

        try {

            const res = await axios.post(`${itemEndPoint}/?token=${token}`,
                                        JSON.stringify(formDataObj),
                                        config_json  
                                        );

            if(debug_ === true){
                console.log('res : ', res);
                console.log('itemId : ',res.data.msg.insertId);
            }

            if(res && res.data.msg.insertId){
              itemId = res.data.msg.insertId ;
              if(debug_){
                console.log('addnewitem, insert item id :', itemId);
              }
            }

        } catch (err) {
            console.log(err);
        }

        if (itemId) {
          this.$router.push(`/item/${itemId}/addnewimage`)
        } else {
          alert('create item failed');
        }

      },

    },

}
</script>


<style scoped>


#root {
  position: absolute;
  width: 100%;
  height: 100%;
}

#inputform {
  position: relative;
  top: 20%;
  left: 35%;
  display: block;
  width: 30%;
  height: 50%;
  background-color: rgb(194, 201, 211);
  box-shadow: 10px 10px 20px 5px rgba(57, 65, 60); 
}

#inputField {
  position: relative;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  /* background-color: beige; */
}

#item_name_label {


}

#item_name {
  position: relative;
  width: 100%;
  border-bottom: 1px solid #848884c0;
}

#market_price {
  position: relative;
  width: 100%;
  border-bottom: 1px solid #848884c0;
}

#price {
  position: relative;
  width: 100%;
  border-bottom: 1px solid #848884c0;
}

#submit {
  position: relative;
  bottom: 10%;
  left: 45%;
  background-color: rgb(132, 132, 139);
}

</style>