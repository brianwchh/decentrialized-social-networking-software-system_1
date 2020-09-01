'use strict'

import {debug_, config_multipart,config_json} from '../../../../global_config'
import {item_cart_url, 
    address_url,
    order_w_token_url,
    get_order_detail_url
    } from '../../../../ipconfig'
import axios from 'axios'
// import {} from '../mutations/cart_mutations'

const cart_actions = {
    async add2cart (context, payload) {

        const item_id = payload.item_id ;
        const item_cnt = Number(payload.item_cnt) ;
        const price = Number(payload.price) ;
        const isSelected = payload.isSelected ;
        const token = payload.token ;

        let formData = new FormData();
        formData.append('item_id', item_id);
        formData.append('item_cnt', item_cnt);
        formData.append('price', price);
        formData.append('isSelected', isSelected);
        // 懶的去轉換成json的了,直接用multipart，麻煩

        if(debug_){
            console.log(item_cart_url(token));
            console.log(payload);
        }

        try {

            const res = await axios.post(item_cart_url(token),
                                        formData,
                                        config_multipart  
                                        );

            if(debug_ === true){
                console.log('res : ', res);
            }

        } catch (err) {
            console.log(err);
        }

    },

    async getCartItemsAction (context, payload) {

        // const token = payload.token ;
        const token = localStorage.getItem('token');

        // 懶的去轉換成json的了,直接用multipart，麻煩

        if(debug_){
            console.log(item_cart_url(token));
            console.log(payload);
        }

        try {

            const res = await axios.get(item_cart_url(token),
                                        config_multipart  
                                        );

            if(debug_ === true){
                console.log('data : ', res.data.data);
            }
            const cartItemDataArray = res.data.data ;
            context.commit('UPDATE_CART_ITEMS',cartItemDataArray);

        } catch (err) {
            console.log(err);
        }

    },

    async getAddressByUserIdAction (context) { 

        const token = localStorage.getItem('token');

        try {

            const res = await axios.get(address_url(token),
                                        config_multipart  
                                        );

            if(debug_ === true){
                console.log('data : ', res.data.data);
            }
            const addressArray = res.data.data ;
            context.commit('UPDATE_ADDRESS',addressArray);

        } catch (err) {
            console.log(err);
        }

    },

    async addNewAddressAction (context, payload) {

        const token = payload.token;
        const addressField = payload.addressField ;
        const isDefault = payload.isDefault ;

        let formData = new FormData();
        formData.append('addressField', addressField);
        formData.append('isDefault', isDefault);

        try {

            const res = await axios.post(address_url(token),
                                        formData,
                                        config_multipart  
                                        );

            if(debug_ === true){
                console.log('res : ', res);
            }

        } catch (err) {
            console.log(err);
        }

    },

    async insertOrderAction (context, payload) {

        // insertOrder(user_id,address,total_price,status))
        if(debug_){
            console.log('inserOrderAction checking cartItemsToBuy , payload :',payload);
        }
        const token = localStorage.getItem('token');

        try {

            const res = await axios.post(order_w_token_url(token),
                                        JSON.stringify(payload),
                                        config_json  
                                        );

            if(debug_ === true){
                console.log('res : ', res);
                console.log('orderId : ', res.data.orderId);
            }

            context.commit('SET_ORDER_ID',res.data.orderId);

        } catch (err) {
            console.log(err);
        }
    },

    async getOrderDetailAction (context, payload) {

        const token = localStorage.getItem('token');
        const order_id = payload.order_id ;

        try {
            if(debug_){
                console.log(get_order_detail_url(token,order_id));
            }

            const res = await axios.get(get_order_detail_url(token,order_id),
                                        config_multipart  
                                        );

            if(debug_ === true){
                console.log('data : ', res.data.data);
            }
            const order_array = res.data.data ;
            context.commit('UPDATE_ORDER_ARRAY',order_array);

        } catch (err) {
            console.log(err);
        }

    },

}

export { cart_actions };