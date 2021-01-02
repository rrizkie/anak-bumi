const product = require('express').Router()
const productController = require('../../controller/product')
const {authentication , authorization} = require ('../../middleware')


// ADMIN & CUSTOMER
product.get('/products',productController.productList)

// ADMIN
product.post('/products',authentication,authorization,productController.addProduct)
product.put('/products/:productId',authentication,authorization,productController.editProduct)
product.get('/products/:productId',authentication,authorization,productController.oneProduct)
product.delete('/products/:productId',authentication,authorization,productController.deleteProduct)



module.exports = product