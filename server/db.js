const mongoose = require('mongoose');
const data = require('./data');

// Connecting to local MongoDB database

mongoose.connect('mongodb://localhost/usersAndOrders', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});






/*-------------------------------Models-------------------------------------- */


let User = mongoose.model('user', new mongoose.Schema({

            userId: Number,
            name: String,

            /* (!) Mongoose/MongoDB doesn't allow to change/modify the Schema after compilation of Model is done.
                   So, i am adding the (noOfOrders) from the get go with default value (-1 means doesnt exist). I could not find anything regarding changing the existing Schema in the mongoose Documentation.
                   
                   The only way is to change the schema in the Code itself or create new model and schema and then 
                   migrate the documents.
             */
            noOfOrders: {type: Number, default: -1}
}));


const Order = mongoose.model('order', new mongoose.Schema({

            orderId: Number,
            userId: Number,
            subtotal: Number,
            date: { type: Date, default: Date.now}
}));






/*---------------------------Populating Collections------------------------------ */

populateCollections().catch(err => console.error(err, err.message));

async function populateCollections()
{
    //Fresh start
    await User.collection.drop().catch(err => err /* ignoring the ns not found error*/);
    await Order.collection.drop().catch(err => err);

    data.usersData.forEach(({ userId, name}) => {

        let user = new User({userId, name});
        user.save();
    });

    data.ordersData.forEach(({ orderId, userId, subtotal, date}) => {

        let order = new Order({ orderId, userId, subtotal, date });
        order.save();
    });
}









/*----------------------------------CRUD fuctions-------------------------------- */

async function userInfo()
{
    let infoArrry = [];
    let users = await User.find({}).select({ _id: 0, __v: 0}).sort({userId: 1});

    for(let {userId, name} of users)
    {
        let orders = await Order.find({ userId }).select({ _id: 0, __v: 0 });
        let totalBillValue = orders.reduce((acc,order) => acc + order.subtotal, 0);

        infoArrry.push({ 

                userId,
                name,
                noOfOrders: orders.length,
                averageBillValue: parseInt(totalBillValue / orders.length)
        });
    }

    return infoArrry;
}





async function addNewKey()
{
    let users = await User.find({}).select({ _id: 0, __v: 0 }).sort({ userId: 1 });

    for (let { userId } of users) 
    {
        let orders = await Order.find({ userId }).select({ _id: 0, __v: 0 });
        let noOfOrders = (orders.length === 0 || orders.length === undefined) ? 0 : orders.length;
        await User.updateOne({ userId },{ noOfOrders }); 
    }

    return { success: true, message: "Successfully updated" };
}







/*---------------------------------Exports-------------------------------------- */

module.exports.userInfo = userInfo;
module.exports.addNewKey = addNewKey;
