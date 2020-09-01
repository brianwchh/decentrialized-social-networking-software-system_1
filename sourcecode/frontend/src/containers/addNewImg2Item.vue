<template>

<div id="component_root">

  <div class="container">
    <!-- {{$route.params}} -->
    <div class="">
      <label>File
        <input type="file" id="0" ref="file" v-on:change="handleFileChanged"/>
      </label>
        <button v-on:click="handleSubmit">Submit</button>
    </div>
    <img class="imageClass" v-bind:src="img_url0" alt="" /> 
  </div>

  <div class="container">
    <!-- {{$route.params}}s -->
    <div class="">
      <label>File
        <input type="file" id="1" ref="file" v-on:change="handleFileChanged"/>
      </label>
        <button v-on:click="handleSubmit">Submit</button>
    </div>
    <img class="imageClass" v-bind:src="img_url1" alt="" /> 
  </div>

  <div class="container">
    <!-- {{$route.params}}s -->
    <div class="">
      <label>File
        <input type="file" id="2" ref="file" v-on:change="handleFileChanged"/>
      </label>
        <button v-on:click="handleSubmit">Submit</button>
    </div>
    <img class="imageClass" v-bind:src="img_url2" alt="" /> 
  </div>

  <div class="container">
    <!-- {{$route.params}}s -->
    <div class="">
      <label>File
        <input type="file" id="3" ref="file" v-on:change="handleFileChanged"/>
      </label>
        <button v-on:click="handleSubmit">Submit</button>
    </div>
    <img class="imageClass" v-bind:src="img_url3" alt="" /> 
  </div>

  <div class="container">
    <!-- {{$route.params}}s -->
    <div class="">
      <label>File
        <input type="file" id="4" ref="file" v-on:change="handleFileChanged"/>
      </label>
        <button v-on:click="handleSubmit">Submit</button>
    </div>
    <img class="imageClass" v-bind:src="img_url4" alt="" /> 
  </div>

  <div class="container">
    <!-- {{$route.params}}s -->
    <div class="">
      <label>File
        <input type="file" id="5" ref="file" v-on:change="handleFileChanged"/>
      </label>
        <button v-on:click="handleSubmit">Submit</button>
    </div>
    <img class="imageClass" v-bind:src="img_url5" alt="" /> 
  </div>

  <div class="container">
      <button class="finish" v-on:click="handleFinish">Finish</button>
  </div>

</div>

</template>

<script>
// import {mapGetters, mapActions} from 'vuex' ;
import {debug_,config_multipart} from '../global_config' ;
import {item_add_new_image_url} from '../ipconfig' ;
import axios from 'axios' ;

export default {
  name: 'addNewImg2Item',
  components: {
    
  },

   data: () => ({

     itemId : '',
     file : '',
     filename : '',
     imgs : {},
     img_updated_signal : false ,
     img_id : '',
     img_url0 : '',
     img_url1 : '',
     img_url2 : '',
     img_url3 : '',
     img_url4 : '',
     img_url5 : '',

    }),

    created () {
      if(debug_){
        console.log(this.$route.params)
      }
    },

    computed : {
      // ...mapGetters(['getLoginStatus']),
      // ...mapGetters({getLoginStatus: 'getLoginStatus'}),
    },

    watch: {
      img_updated_signal : function() { 
        console.log('this.img_id',this.img_id);

        switch(Number(this.img_id)) {
          case 0:
            this.img_url0 = this.imgs[0];
            break;
          case 1:
            this.img_url1 = this.imgs[1];
            break;
          case 2:
            this.img_url2 = this.imgs[2];
            break;
          case 3:
            this.img_url3 = this.imgs[3];
            break;
          case 4:
            this.img_url4 = this.imgs[4];
            break;
          case 5:
            this.img_url5 = this.imgs[5];
            break;
          default:
            this.img_url0 = '';
        }
      },

    },

    methods: {
                       
      // ...mapActions({
      //   login: 'login'
      // }),

      handleFileChanged(event){
        if (!event || !event.target || !event.target.files || event.target.files.length === 0) {
            return;
          }
        // this.file = this.$refs.file.files[0];
        this.file = event.target.files[0] ;
        this.filename = this.file.name ;

        console.log(event.target.id)
        this.img_id = event.target.id ;

        if(debug_){
          console.log(this.filename)
        }
        
        // const name = event.target.files[0].name;
        // console.log('filename:',name);


        console.log(debug_);

      },

      async handleSubmit () {

        let formData = new FormData();
        formData.append('file', this.file);
        formData.append('filename',this.filename);
        formData.append('item_id',Number(this.$route.params.itemId))

        let image_url ;

        try {

            const res = await axios.post(item_add_new_image_url,
                                        formData,
                                        config_multipart  
                                        );

            if(debug_ === true){
                console.log('res : ', res);
            }

            image_url = res.data.img.uri;
            this.imgs[this.img_id] = image_url ;

            // console.log('this.img_id : ', this.img_id);
            // console.log('imgs : ',this.imgs);
            // console.log(this.imgs[0])
            // console.log(this.imgs[1])
            
            this.img_updated_signal = !this.img_updated_signal ;

        } catch (err) {
            console.log(err);
        }

      },

      handleFinish () {
        this.$router.push({name : 'itemList'})
      }


    },

}
</script>


<style scoped>

#component_root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

.container .imageClass {
  border: 1px solid #ddd;
  /* border-radius: 50%; */
  padding: 5px;
  width: 150px;
}

.container button {
  background-color: rgba(206, 194, 194);
}

.container .finish {
  position: relative;
  left: 28%;
  background-color: rgba(206, 194, 194);
}

</style>