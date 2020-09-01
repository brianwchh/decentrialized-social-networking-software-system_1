<template>

<div id="component_root">

  <div id="detailShow">
    <!-- <img  v-bind:src="selected_img" alt="" :key="selected_imgId" /> -->
    <img  v-bind:src="selected_img" alt=""  />
  </div>

  <div id="allImgs">
    <a class="imgContainer" v-for="(img,index) in imgArray" :key="index" 
      v-on:click="handleClickOnImg(index)"
    >
      <img v-bind:src="img" alt="" />
    </a>
  </div>

  <div id="description">
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" v-on:click="handleAdd2Cart">Add to Cart</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </div>

</div>

</template>

<script>
// import {mapGetters, mapActions} from 'vuex' ;
import {mapGetters, mapActions} from 'vuex' ;
import {debug_,config_json} from '../global_config' ;
import {item_get_item_by_id} from '../ipconfig' ;
import axios from 'axios' ;

export default {
  name: 'itemDetail',
  components: {
    
  },

   data: () => ({
     selected_img : '',
     selected_imgId : 0,
     item_name : '',
     market_price : '',
     price : '',
     amount : '',
     imgArray : [],
    }),

    created () {

      this.getItemById();

    },

    computed : {
      ...mapGetters(['getLoginStatus']),
      ...mapGetters({getLoginStatus: 'getLoginStatus'}),
    },

    watch: {
      selected_imgId : function() { 
        this.selected_img = this.imgArray[this.selected_imgId];
        if(debug_){
          console.log('this.selected_imgId',this.selected_imgId);
          console.log('itemDetail selected_img : ',this.selected_img);
        }
      },

    },



    methods: {

      ...mapActions({
        add2cart: 'add2cart',
        validateToken: 'validateToken',
        getCartItemsAction: 'getCartItemsAction',
      }),


      async getItemById () {
        const item_id = this.$route.params.itemId;
        console.log(item_id)
        try {
          const res = await axios.get(item_get_item_by_id(item_id),config_json);

          let itemInfo = res.data.data  ;// JSON.parse(res.data.data) ;
          this.item_name = itemInfo.item_name ;
          this.market_price = itemInfo.market_price;
          this.price = itemInfo.price ;
          const imgArrayLen = itemInfo.imgArray.length;
          if(imgArrayLen > 6) {
            // Array.slice(begin, end)
            this.imgArray = itemInfo.imgArray.slice(1,6+1)
          } else {
            this.imgArray = itemInfo.imgArray ;
          }
          itemInfo.imgArray = this.imgArray ;
          this.selected_img = this.imgArray[0];

          if (debug_){
            console.log('itemDetail itemInfo : ',itemInfo);
          }
          
        } catch (err) {
          console.log('err : ',err);
        }
        
      },

      handleClickOnImg(index){
        // this.selected_img = this.imgArray[index];
        this.selected_imgId = index ;
        
        if(debug_){
          console.log(index);
        }

      },

      async handleAdd2Cart(){

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
        const item_id = this.$route.params.itemId ;

        if(debug_){
          console.log('item_id = ', item_id);
        }

        let payload = {
          token: token ,
          item_id: item_id,
          item_cnt : 1 ,
          price : this.price ,
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

      
    },

}
</script>


<style scoped>

#component_root {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 60% 17% 20%;
  background-color: aliceblue;
  justify-items: center;
}

#detailShow {
  width: auto;
  height: 100%;
  /* max-width: 100%;
  max-height: 100%; */
  background-color: rgb(224, 228, 233);
  border-radius: 1%;
  box-shadow: 10px 10px 20px 5px rgba(57, 65, 60); 
  display: grid;
  grid-template-columns: 100%;
  align-items: center;
  justify-items: center;
}

#detailShow > img {
  height: auto;
  width: auto;
  max-width: 100%;
  max-height: 100%;
}


#allImgs {
  width: 90%;
  height: 100%;
  margin-top: 2.8vh;
  /* background-color: rgb(193, 193, 206); */
  border-radius: 1%;
  box-shadow: 10px 10px 20px 5px rgba(57, 65, 60);
  display: grid;
  grid-template-columns: 16.667% 16.667% 16.667% 16.667% 16.667% 16.667%;
  align-items: center;
  justify-items: center;
}

#allImgs > .imgContainer {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  justify-items: center;
  align-items: center;
}

#allImgs img{
  width: 90%;
  height: 90%;
  object-fit: cover;
}

#description {
  width: 90%;
  height: 100%;
  margin-top: 3vh;
  display: grid;
  grid-template-columns: 100%;
  justify-items: center;
  align-items: center;
  /* background-color: rgb(208, 209, 218); */
  border-radius: 1%;
  box-shadow: 10px 10px 20px 5px rgba(57, 65, 60);
}

</style>