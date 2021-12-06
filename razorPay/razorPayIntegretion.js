// 1. Razor Pay or Any payment gateway Integration sample code : 

// --- I don't had much time to finish razorpay apis properly, so i made a simple one. my apologise.

const razorPay = require("razorpay");
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });

const razorpay = new razorPay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET,
  })

 // creating order from user here :
const createOrder =async (req,res)=> {
    console.log("amount - ",req.body.amount)
    let options = {
        amount : req.body.amount * 100,  
        currency : req.body.currency,
        receipt : req.body.receipt  // this is just an sample, along with this information, other order details will be recieved from frontent to process and store it into db
      };
    try{
         await razorpay.orders.create(options,(err,order)=>{
            if(err){
                res.status(400).json({Message:"Create order",Result:"Failed",Reason:'Unable to create order'});
            }else{
            console.log('order - ',order);
            res.json({
                Message:"Create order",
                Result:"Success",
                Response:{orderId:order.id}
            })
            }
        })     
    }catch{
        console.log(err);
        res.status(500).json({Message:"Create order",Result:"Failed",Reason:'Unable to create order'});
    }

}

// capturing payment status to verify payment is done or not using payment id :
const capturePayment = async(req,res)=>{
try{
    await razorpay.payments.fetch(req.body.paymentId).then((paymentDocument)=>{ 
        console.log("doc - ",paymentDocument); // the payment was successfully done or not could be verfied by status is captured or not 
        paymentDocument.status === 'captured'?res.json({Message:"Capture payment",Result:"Success",Response:"Payment complete"}):res.json({Message:"Capture payment",Result:"Failed",Reason:"Payment is not complete"});
      })
}catch (err){
    console.log(err);
    res.status(500).json({Message:"Capture payment",Result:"Failed",Reason:'Unable to capture payment status!'});
}
}

exports.createOrder = createOrder;
exports.capturePayment = capturePayment;