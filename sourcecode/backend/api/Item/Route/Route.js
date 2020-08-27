'user strict';
const Joi = require('@hapi/joi')

const {ItemView} = require('../View/ItemView')
const {ChartItemView} = require('../View/ChartItemView')


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
                allow: 'multipart/form-data',
                multipart: true
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

    // *****************ChartItem block***************************************

    {
        path: '/api/item/createChartItemTable',
        method: 'POST', 
        options: {
            auth: 'isCurrentOrSuper',
        },
        handler : ChartItemView.createChartItemTable
    },

    {
        path: '/api/item/chart', // each user can only have one chart
        method: 'GET', 
        options: {
            auth: 'isCurrentOrSuper',
        },
        handler : ChartItemView.listChartItem
    },

    {
        path: '/api/item/chart', // each user can only have one chart
        method: 'POST', 
        options: {
            payload: {
                parse: true,
                allow: 'multipart/form-data',
                multipart: true
            },
            auth: 'isCurrentOrSuper',
        },
        handler : ChartItemView.add2Chart
    },

    {
        path: '/api/item/chart',
        method: 'PUT', 
        options: {
            auth: 'isCurrentOrSuper',
        },
        handler : ChartItemView.editChart
    },

    {
        path: '/api/item/chart',
        method: 'DELETE', 
        options: {
            auth: 'isCurrentOrSuper',
        },
        handler : ChartItemView.delteChartItems
    },

    {
        path: '/api/item/order',
        method: 'GET', 
        options: {
            auth: 'isCurrentOrSuper',
        },
        handler : ItemView.getOrderList
    },

    {
        path: '/api/item/order',
        method: 'POST', 
        options: {
            auth: 'isCurrentOrSuper',
        },
        handler : ItemView.createOrder
    },

    {
        path: '/api/item/order/{id}',
        method: 'PUT', 
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number()
                })
            },
            auth: 'isCurrentOrSuper',
        },
        handler : ItemView.editOrder
    },

    {
        path: '/api/item/order/{id}',
        method: 'DELETE', 
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number()
                })
            },
            auth: 'isCurrentOrSuper',
        },
        handler : ItemView.deleteOrder
    },

    {
        path: '/api/item/address',
        method: 'POST', 
        options: {
            auth: 'isCurrentOrSuper',
        },
        handler : ItemView.createAddress
    },

    {
        path: '/api/item/address',
        method: 'GET', 
        options: {
            auth: 'isCurrentOrSuper',
        },
        handler : ItemView.getAddressList
    },

    {
        path: '/api/item/address/{id}',
        method: 'GET', 
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number()
                })
            },
            auth: 'isCurrentOrSuper',
        },
        handler : ItemView.getAddressDetail
    },

    {
        path: '/api/item/address/{id}',
        method: 'PUT', 
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number()
                })
            },
            auth: 'isCurrentOrSuper',
        },
        handler : ItemView.editAddress
    },

    {
        path: '/api/item/address/{id}',
        method: 'DELETE', 
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number()
                })
            },
            auth: 'isCurrentOrSuper',
        },
        handler : ItemView.deleteAddress
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


]

module.exports = Route  ;