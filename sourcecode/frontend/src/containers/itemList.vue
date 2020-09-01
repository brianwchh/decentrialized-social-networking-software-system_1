<template>
<div id="component_root">

  <v-card
    class="mx-auto"
    max-width="500"
    width = "100%"
    height="100%"
    
  >
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="(item,index) in querySet"
          :key="index"
          :cols="6"
        >
          <v-card>
            <v-img
              :src="item.imgArray[0]"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              v-on:click="handleClickOnImg(item.id)"
            >
              <v-card-title v-text="item.item_name"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon v-on:click="handleAdd2Cart(item.id,item.price,index)">
                <v-icon>mdi-cart</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>

</div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex' ;
import {debug_,config_json} from '../global_config' ;
import {itemEndPoint} from '../ipconfig' ;
import axios from 'axios' ;

export default {
  name: 'itemList',
  components: {
    
  },

   data: () => ({

      querySet : '',
      amount : [],

      // cards: [
      //   { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
      //   { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
      //   { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      // ],

    }),

    created () {
      if(debug_){
        console.log('get item list')
      }
      this.getItems();

    },

    computed : {
      ...mapGetters({getCartItems: 'getCartItems',
                    getCartItemNumber : 'getCartItemNumber',
                    getTokenStatus : 'getTokenStatus',
      }),
    },

    watch: {
      getCartItemNumber : function() { 
        console.log('getCartItemNumber :',this.getCartItemNumber);

      },

    },

    /** 
     * axios.get(`${orderSummaryURL}?token=${token}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                dispatch(cartSuccess(res.data));
            })
            .catch(err => {
                dispatch(cartFail(err));
            });
    };
    */

    methods: {

      ...mapActions({
        add2cart: 'add2cart',
        validateToken: 'validateToken',
        getCartItemsAction: 'getCartItemsAction',
      }),

      async handleAdd2Cart (item_id,price,index){
        /**
        const user_id = payload.user_id ; backend can get it from token
        const item_id = payload.item_id ;
        const item_cnt = Number(payload.item_cnt) ;
        const price = Number(payload.price) ;
        const isSelected = payload.isSelected ;
         */
        const token = localStorage.getItem('token');
        if(!token) {
          alert('no token found, please login')
        }
        // check login status, token valid ? 
        await this.validateToken();
        const isLogin = this.getTokenStatus ;
        if(debug_){
          console.log('isLogin = ', isLogin);
        }
        if(isLogin === false) {
          alert("please login to continue !");
          return ;
        }


        // better check whether token is valid

        let payload = {
          token: token ,
          item_id: item_id,
          item_cnt : this.amount[index] ,
          price : price ,
          isSelected : true // default true, can unselect in cart list 
        }
        
        // this.validateToken(payload); // to do in backend
        await this.add2cart(payload);

        // get cart items 
        payload = {
          token: token
        };

       await this.getCartItemsAction(payload);

        if(debug_){
          console.log('getCardItem done in ItemList.vue')
        }

      },

      handleClickOnImg (item_id) {
        this.$router.push(`/item/${item_id}`);
      },

      async getItems () {
        if(debug_){
          console.log('in getItems function');
        }
        try {

          const res = await axios.get(itemEndPoint,config_json);

          this.querySet = res.data.data  ;// JSON.parse(res.data.data) ;
          const queryLen = this.querySet.length;
          let i=0;
          for(i=0; i<queryLen; ++i){
            this.amount[i] = 1 ; // demo 
          }

          if (debug_){
            console.log('itemList : ',this.querySet);
            /**
             *  id: (...)
                imgArray: (...)
                item_name: (...)
                market_price: (...)
                price: 1.8
             */
          }
          
        } catch (err) {
          console.log('err : ',err);
        }
        
      },
      
    },

}
</script>


<style scoped>

#component_root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  /* background-color: blue; */
}


</style>