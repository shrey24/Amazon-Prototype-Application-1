
const express = require('express')
const router = express.Router()
var mongoose = require('mongoose');
const addressServices = require('../services/address')
const checkAuth = require('../config/passport')
var kafka = require('../kafka/client');

router.get('/getAddress/:customer_id', async (request, response) => {
    try {
        const data = {
            "params": request.params,
            "query": request.query,
            "user": request.user,
            "type": "getAddress"
        }
        ///
          await kafka.make_request('address-card', data, async (err, data) => {
            if (err) throw new Error(err)
            await response.status(data.status).json(data.body);
        });
        ///
        // let res = await addressServices.getAddress(data);
        // response.status(res.status).json(res.body);
    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while getting address details'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
});



router.post('/addAddress', checkAuth, async (request, response) => {
    try {
        const data = {
            "body": request.body,
            "id": request.params.customer_id,
            "params": request.params,
            "query": request.query,
            "user": request.user,
            "type": "addAddress"

        }
        // response.end()
        ///
        await kafka.make_request('address-card', data, async (err, data) => {
            if (err) throw new Error(err)
            await response.status(data.status).json(data.body);
        });
        ///
        // let res = await addressServices.addAddress(data);
        // response.status(res.status).json(res.body);
    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while adding address details'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
});

router.put('/updateAddress/:customer_id/address/:id', async (request, response) => {
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
            "type": "updateAddress"

        }

        console.log('updating address - ', data)
///
await kafka.make_request('address-card', data, async (err, data) => {
    if (err) throw new Error(err)
    await response.status(data.status).json(data.body);
});
///
        // let res =await addressServices.updateAddress(data);
        // response.status(res.status).json(res.body);
    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while updating address'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
});



router.delete('/deleteAddress/:customer_id/address/:address_id', async (request, response) => {
    try {
        const data = {
            "body": request.body,
            "params": request.params,
            "query": request.query,
            "type": "deleteAddress"

        }
        ///
        await kafka.make_request('address-card', data, async (err, data) => {
            if (err) throw new Error(err)
            await response.status(data.status).json(data.body);
        });
        ///
        // let res = await addressServices.deleteAddress(data);
        // response.status(res.status).json(res.body);
    } catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while deleting address'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
});


router.get('/:customer_id/detail/:address_id', async (request, response) => {
    try {
        const data = {
            "params": request.params,
            "type": getAddressDetail
        }
          ///
          await kafka.make_request('address-card', data, async (err, data) => {
            if (err) throw new Error(err)
            await response.status(data.status).json(data.body[0]);
        });
        ///
        // let res = await addressServices.getAddressDetail(data);
        // let result = res.body[0]
        // response.status(res.status).json(result)
    }
    catch (error) {
        if (error.message)
            message = error.message
        else
            message = 'Error while getting address details'

        if (error.statusCode)
            code = error.statusCode
        else
            code = 500

        return response.status(code).json({ message });
    }
});



module.exports = router