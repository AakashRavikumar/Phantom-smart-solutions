// 5. Three functions should be called using Async await :

const asyncAwait = (req, res) => {
    const wait_and_run = (value, milli_seconds, error) => {
        return new Promise((resolve, reject) => { 
            setTimeout(() => {
                if (!error) {
                    resolve(value);
                } else {
                    reject('Error');
                }
            }, milli_seconds);
        });
    }


    const func_1 = () => {
        return wait_and_run(10, 1000, false); // it will wait one sec and take the value 10 to resolve
    }

    const func_2 = () => {
        return wait_and_run(100, 2000, false); // it will wait two sec and take the value 100 to resolve
    }

    const func_3 = () => {
        return wait_and_run(1000, 3000, false); // it will wait three sec and take the value 1000 to resolve
    }


    const run_all_funcs = async() => {
        let result = null;
        try {
            result = await Promise.all([
                func_1(),
                func_2(),
                func_3()
            ]);
            console.log('resolved - ', result); // in promise.all, result is always an array 
            res.json({
                Message: "Three functions called using async await and it will generate 5 second delayed response",
                Result: "Success",
                Response: result 
            })
        } catch (err) {
            console.log('rejected - ', err); // if any one got rejected, error case will run 
        }
    }

    run_all_funcs(); 

}
exports.asyncAwait = asyncAwait;