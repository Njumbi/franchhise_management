const Store = require('../models/stores');

exports.getStoresPage = (req, res, next) => {
    res.render('stores.ejs', {
        path: 'stores'
    })
}

exports.getStoresData = (req, res, next) => {
    const loggedInUser = req.session.user;
    Store.findAll({
                where: {
                    ownerId: loggedInUser.id
                }
            }

        )
        .then(data => {
            res.status(200).json({
                draw: req.body.draw,
                recordsTotal: data.length,
                data: data
            })
        })
        .catch(error => {
            console.log(error)
        })

}
exports.postAddStore = (req, res, next) => {
    const storeName = req.body.storeName;
    console.log(req.session.user)
    Store.findOne({
            where: {
                storeName: storeName
            }
        })
        .then(store => {
            if (store) {
                res.status(200).json({
                    "status": false,
                    "message": "store already exists",
                })
            } else {
                const newStore = new Store({
                    storeName: storeName,
                    ownerId: req.session.user.id


                })
                newStore
                    .save()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "message": "store succesfully added"
                        })
                    })
                    .catch(error => {
                        console.log(error)
                        res.status(200).json({
                            "status": false,
                            "message": error,
                        })
                    })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(200).json({
                "status": false,
                "message": error,
            })
        })
}
exports.getDeleteStore = (req, res, next) => {
    const storeName = req.query.storeName;
    Store.destroy({
            where: {
                storeName: storeName
            }
        })
        .then((store) => {
            if (store === 1) {
                res.status(200).json({
                    status: true,
                    message: "Deleted" + storeName + "successfully"
                })
            } else {
                res.status(200).json({
                    status: false,
                    message: "store cant be deleted"
                })
            }
        })
        .catch((error) => {
            res.status(200).json({
                status: false,
                message: error
            })
        })
}