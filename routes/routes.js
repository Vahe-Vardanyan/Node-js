var express = require('express');
var router = express.Router();
var fs = require('fs');
var dir = './public/prd_images/';
var picNamePath = '';
var changeNamePath = '';
var multer = require('multer');
var moment = require('moment');
const UserModel = require('../schema');
var rimraf = require("rimraf");

var img_id = '';
var img_idUp = '';



var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        try {
            if (!fs.existsSync(dir + img_id)) {
                fs.mkdirSync(dir + img_id) // add folder
            }
        } catch (err) {
            console.error(err)
        }
        callback(null, dir + img_id);
    },
    filename: function(req, file, callback) {
        picNamePath = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        callback(null, picNamePath);
    }
});
var upload = multer({ storage: Storage }).array("imgUploader", 3);

//----------------------



//-----------------

router.post("/upload", (req, res) => {

    let image = new UserModel({
        picPath: '',
        text: '',
        failsize: 0,
        addDate: Date.now()
    });
    img_id = image._id.id.toString('hex');

    upload(req, res, function(err) {
        if (err) {
            // res.status(err.status || 500);
            // res.render('error', {
            //     message: err.message,
            //     error: err,
            // });
            res.end(err.message);
        } else {
            image.text = req.body.dtext;
            image.failsize = Number(req.body.fsize);
            image.picPath = picNamePath;
            // save in to mongo db
            image.save(function(err) {
                if (err)
                    throw err;
                else
                    res.redirect('/product');
            });
        }
    });
});
var a = "";

router.post("/change", (req, res) => {
    // a = req.body.changeid;
    let image = new UserModel({
        picPath: '',
        text: '',
        failsize: 0,
        addDate: Date.now()
    });
    a = image._id.id.toString('hex');
    var Storage2 = multer.diskStorage({
        destination: function(req, file, callback) {
            try {
                if (!fs.existsSync(dir + a)) {
                    fs.mkdirSync(dir + a) // add folder
                }
            } catch (err) {
                console.error(err)
            }
            callback(null, dir + a);
        },
        filename: function(req, file, callback) {
            changeNamePath = file.fieldname + "_" + Date.now() + "_" + file.originalname;
            callback(null, changeNamePath);
        }
    });
    var upload2 = multer({ storage: Storage2 }).array("changeUploader", 3);

    upload2(req, res, function(err) {
        if (err) {
            res.end(err.message);
        } else {

            UserModel.findByIdAndUpdate({ "_id": req.body.changeid }, { $set: { "text": req.body.chengetext, "picPath": changeNamePath } },

                function(err, result) {
                    if (!err) {
                        res.redirect('/product');
                    } else {
                        res.end(err);
                    }
                });
        }
    });
});




// Geters



router.get('/product', async function(req, res) {
    await UserModel.find({}, (err, docs) => {
        if (err) {
            res.end(err);
        } else {
            imgname = "req.bodykj";
            res.render('products.html', { docs, imgname });
        }
    });
});

router.get('/opload', function(req, res) {
    res.render('products.html');
});


router.get('/', async function(req, res) {
    await UserModel.find({}).sort({ failsize: -1 }).limit(1).exec((err, picdoc) => {
        if (!err) {
            res.render('index.html', { picdoc });
        } else {
            res.end(err);
        }
    });

});

router.get('/admin', function(req, res) {

    res.render('admin.html');
});



router.get('/deleteitem', async function(req, res) {

    await UserModel.deleteOne({ _id: req.query.iditem }, function(err, obj) {
        if (!err) {
            res.redirect('/product');
        } else {
            res.end(err);
        }
    });
    await rimraf(dir + req.query.iditem, function() {});

});



module.exports = router;