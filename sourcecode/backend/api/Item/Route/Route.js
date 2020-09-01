'user strict';
const Joi = require('@hapi/joi')

const {ItemView} = require('../View/ItemView')
const {CartItemView} = require('../View/CartItemView')
const {OrderView} = require('../View/OrderView')
const {AddressView} = require('../View/AddressView')


Route = [

    // **********************Item block **********************************************************
    {
        path: '/api/item',
        method: 'GET', 
        handler : ItemView.listItems
    },

    {
        path: '/api/item',
        method: 'POST', 
        options: {
            payload: {
                parse: true,
                allow: 'application/json',
                // multipart: false
            },
            auth: 'isSuperUser',
        },
        handler : ItemView.createItem
    },

    {
        path: '/api/item/{id}',
        method: 'GET', 
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number()
                })
            },
        },
        handler : ItemView.itemDetail
    },

    {
        path: '/api/item/{id}',
        method: 'PUT', 
        options: {
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: true
            },

            validate: {
                params: Joi.object({
                    id: Joi.number()
                })
            },
        },
        handler : ItemView.updateItem
    },

    {
        path: '/api/item/{id}',
        method: 'DELETE', 
        options: {
        },
        handler : ItemView.deleteItem
    },

    // *****************CartItem block***************************************

    {
        path: '/api/item/createcartitemtable',
        method: 'POST', 
        // options: {
        //     // auth: 'isCurrentOrSuper',
        // },
        handler : CartItemView.createCartItemTable
    },

    {
        path: '/api/item/cart', // each user can only have one cart
        method: 'GET', 
        options: {
            auth: 'isCurrentOrSuper',
        },
        handler : CartItemView.listCartItem
    },

    {
        path: '/api/item/cart', // each user can only have one cart
        method: 'POST', 
        options: {
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: true
            },
            // auth: 'isCurrentOrSuper',
        },
        handler : CartItemView.add2Cart
    },

    {
        path: '/api/item/cart',
        method: 'PUT', 
        options: {
            auth: 'isCurrentOrSuper',
        },
        handler : CartItemView.editCart
    },

    {
        path: '/api/item/cart',
        method: 'DELETE', 
        options: {
            auth: 'isCurrentOrSuper',
        },
        handler : CartItemView.delteCartItems
    },


    {
        path: '/api/address/createaddresstable',
        method: 'POST', 
        options: {
            // auth: 'isCurrentOrSuper',
        },
        handler : AddressView.createaddresstable
    },

    {
        path: '/api/address',
        method: 'POST', 
        options: {
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: true
            },
            auth: 'isCurrentOrSuper',
        },
        handler : AddressView.insertAddress
    },

    {
        path: '/api/address',
        method: 'GET', 
        options: {
            auth: 'isCurrentOrSuper',
        },
        handler : AddressView.getAddressbyUserId
    },


    {
        path: '/api/item/image',
        method: 'POST', 
        options: {
            payload: {
                // maxBytes: 1024 * 1024 * 100,
                // // timeout: false, // important
                parse: true,
                // output: 'data',
                allow: 'multipart/form-data',
                multipart: true
            },

            // auth : 'isSuperUser' ,

            validate:{
                payload: Joi.object({
                    file: Joi.binary().required(),
                    filename: Joi.string().required(),
                    // user_id: Joi.number().required(),
                    item_id: Joi.number().required()
                })
            }
        },
        handler : ItemView.uploadImage
    },

    {
        path: '/api/item/image/{id}',
        method: 'DELETE', 
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number()
                })
            },
        },
        handler : ItemView.deleteImage
    },


    //************* Order ************************************ */
    {
        path: '/api/order/createordertable',
        method: 'POST', 
        options: {
            // auth: 'isCurrentOrSuper',
        },
        handler : OrderView.createOrderTable
    },

    {
        path: '/api/order',
        method: 'POST', 
        options: {
            auth: 'isCurrentOrSuper',
            payload: {
                parse: true,
                allow: 'application/json',
                // multipart: true
            },
        },
        handler : OrderView.inserOrder
    },


    {
        path: '/api/order',
        method: 'GET', 
        options: {
            auth: 'isCurrentOrSuper',

        },
        handler : OrderView.getOrderDetail
    },
    

]

module.exports = Route  ;