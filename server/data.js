const usersData = [
    { userId: 1, name: 'rahul' },
    { userId: 2, name: 'ramesh' },
    { userId: 3, name: 'ankita' },
];

const ordersData = [

    { orderId: 1, userId: 1, subtotal: 500, date: "23 January 2019" },
    { orderId: 2, userId: 2, subtotal: 400, date: "16 March 2019" },
    { orderId: 3, userId: 1, subtotal: 150, date: "20 March 2019" },
    { orderId: 4, userId: 1, subtotal: 700, date: "25 March 2019" },
    { orderId: 5, userId: 3, subtotal: 200, date: "21 Feb 2019" },
    { orderId: 6, userId: 3, subtotal: 1500, date: "22 Feb 2019" },
    { orderId: 7, userId: 1, subtotal: 1200, date: "16 April 2019" },
    { orderId: 8, userId: 2, subtotal: 1600, date: "1 May 2019" },
    { orderId: 9, userId: 2, subtotal: 900, date: "23 May 2019" },
    { orderId: 10, userId: 1, subtotal: 700, date: "13 April 2019" },
];

module.exports.usersData = usersData;
module.exports.ordersData = ordersData;