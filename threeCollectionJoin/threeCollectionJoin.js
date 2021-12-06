// 3. Mongoose Three collections Join

const connect = require("../database/dbConnection")
const Book = require("../model/book");

const joinCollections = async(req, res) => {

    try {
        /* 
        * I have used loopup to join three collections.

        * 'booksdetails' is the main collection contains information: bookname, author, volumes. 
         the main collection joined with other two collections called 'copiessold' which has number of copies sold info
        and 'publishedDate' which has date of the books published.
        */

        const joinedCollection = await Book.aggregate([{ $lookup: { from: "publisheddate", localField: "name", foreignField: "name", as: "publishedDate" } }, { $lookup: { from: "copiessold", localField: "name", foreignField: "bookname", as: "totalCopiesSold" } },{$project:{_id:0,name:1,author:1,volumes:1,publishedDate:{date:1},totalCopiesSold:{copiessold:1}}}]);
    
        res.json({
            Message: 'Join three collections',
            Result: 'Success',
            Response: { JoinedCollection: joinedCollection }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            Message: 'Join three collections',
            Result: 'Failed',
            Reason: 'Internal server error',
        });
    }
};

exports.joinCollections = joinCollections;