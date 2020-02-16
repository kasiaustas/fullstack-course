const Order = require('../models/Order');
const errorHandler = require('../utils/errorHandler');

//(get) localhost:5000/api/order?offset2&limit=5
// в query все что после знака "?"
module.exports.getAll = async function (req, res) {


    const query = {
        user: req.user.id
    };

    //Дата старта
    if(req.query.start){
        query.date = {
            //больше или равно
            $gte: req.query.start
        }
    }

    //Дата конца
    if(req.query.end){
        if(!query.date){
            query.date = {}
        }
        query.date['$lte'] = req.query.end
    }

    //Хотим получить определенный номер заказа
    if(req.query.order){
        query.order = +req.query.order
    }

    try {
      const orders =  await Order
          .find(query)
          //.find({user: req.user.id})
          .sort({date: -1})
          .skip(+req.query.offset)//+ приводит строку к числу
          .limit(+req.query.limit);

        res.status(200).json(orders);

    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.create = async function (req, res) {
    try {
      const lastOrder = await Order
          .findOne({user: req.user.id})
          .sort({date: -1}); //в порядке убывания

      const maxOrder = lastOrder ? lastOrder.order : 0;

      const order = await new Order({
         list: req.body.list,
         user: req.user.id,
         order: maxOrder + 1
      }).save();

      res.status(201).json(order);
    } catch (e) {
        errorHandler(res, e)
    }
}