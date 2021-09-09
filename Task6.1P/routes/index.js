var express = require('express');
var router = express.Router();
const dburl = 'mongodb://superuser:789110a@47.102.47.144:27017'
const MongoClient = require('mongodb').MongoClient

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/adduser', function (req, res, next) {
    MongoClient.connect(dburl, function (err, db) {
        if (err) throw err;
        const homework = db.db('homework')
        homework.collection('user6.1p').find({ name: req.body.name }).toArray((err, result) => {
            if (err) throw err

            if (result.length != 0) {
                res.send('500')
                return
            } else {
                MongoClient.connect(dburl, function (err, db) {
                    if (err) throw err;
                    const homework = db.db('homework')
                    homework.collection('user6.1p').insertOne(req.body, (err, result) => {
                        if (err) throw err
                        res.send('200')
                        db.close()
                    })
                });
            }

            db.close()
        })
    });
})

router.get('/searchone', function (req, res, next) {
    MongoClient.connect(dburl, (err, db) => {
        if (err) throw err
        const homework = db.db('homework')
        homework.collection('user6.1p').find({ name: req.query.one }).toArray((err, result) => {
            if (err) throw err
            if (result.length == 0) {
                res.send('404')
                return
            } else {
                res.send(result)
            }

            db.close()
        })
    })
})

router.get('/deleteone', function (req, res, next) {
    console.log(req.query.one);
    MongoClient.connect(dburl, (err, db) => {
        if (err) throw err
        const homework = db.db('homework')
        homework.collection('user6.1p').deleteOne({ name: req.query.one }, function(err,obj) {
            if(err) throw err
            res.send('delete success')
            db.close()
        })
    })
})

router.post('/updateone', function (req, res, next) {
    MongoClient.connect(dburl, function (err, db) {
        if (err) throw err;
        const homework = db.db('homework')
        var whereStr = {"name":req.body.name};  // 查询条件
        var updateStr = {$set: req.body};
        homework.collection('user6.1p').updateOne(whereStr,updateStr,function(error,result) {
            if(error) throw error
            res.send('update success')
            db.close()
        })
    });
})

router.get('/showall', function(req,res,next) {
    MongoClient.connect(dburl, (err, db) => {
        if (err) throw err
        const homework = db.db('homework')
        homework.collection('user6.1p').find().toArray((err, result) => {
            if (err) throw err

            res.send(result)

            db.close()
        })
    })
})

module.exports = router;
