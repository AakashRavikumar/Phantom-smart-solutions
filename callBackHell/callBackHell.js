// 6. Callback hell problem should execute in Node.js code :

const callBackHell = (req, res) => { // I have used immediately invoked function and if condition ofcourse to complete this callback hell.    
                                     // Moreover, I provided static values so, it always a success. 
    let e_commerce_site = "flipkart"; 

    ((site) => {
        let category;

        if (site === "flipkart") {
            console.log("website = ", site);
            category = "fashion";

            ((category) => {
                let sub_category_1;

                if (category === "fashion") {
                    console.log("category = ", category);
                    sub_category_1 = "men";

                    ((sub_category_1) => {
                        let sub_category_2;

                        if (sub_category_1 === "men") {
                            console.log("sub_category_1 = ", sub_category_1);
                            sub_category_2 = "t-shirt";

                            ((sub_category_2) => {
                                if (sub_category_2 === "t-shirt") {
                                    console.log("sub_category_2 = ", sub_category_2);
                                    console.log("select t-shirt and purchase..!");

                                } else {
                                    console.log("only t-shirts are available");
                                }

                            })(sub_category_2);

                        } else {
                            console.log("only sub-category men is allowed!");
                        }

                    })(sub_category_1);

                } else {
                    console.log("only category fashion is available");
                }

            })(category);

        } else {
            console.log("only flipkart site is allowed!");
        }

    })(e_commerce_site);

    res.json({
        Message: 'Callback hell',
        Result: 'Success',
        Response: "Please, check result in console"
    })
};

exports.callBackHell = callBackHell;