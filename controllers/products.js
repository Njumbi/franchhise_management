const Product = require('../models/products');
const Store = require('../models/stores')

exports.getProductsPage = (req, res, next) => {
    // get data from session
    const user = req.session.user;

    //stores attached to the user
    Store.findAll({
            where: {
                ownerId: user.id
            }
        })
        .then((stores) => {
            res.render('product.ejs', {
                path: 'products',
                stores: stores
            })
        })
        .catch(error => {
            console.log(error)
            next(error)
        })

}
exports.getProductsData = (req, res, next) => {
    const user = req.session.user
    Product.findAll({
            where: {
                userId: user.id
            }
        })
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
exports.postAddProducts = (req, res, next) => {
    const image = req.file.path
    const productName = req.body.productName;
    const productSize = req.body.productSize;
    const productQty = req.body.productQty;
    const productBrand = req.body.productBrand;
    const productDesc = req.body.productDesc;
    const productPrice = req.body.productPrice;
    const productStore = req.body.productStore;
    const user = req.session.user

    Product.findOne({
            where: {
                name: productName
            }
        })
        .then((product) => {
            if (product) {
                res.status(200).json({
                    status: true,
                    message: "product already exists"

                })
            } else {
                const saveProduct = new Product({
                    name: productName,
                    description: productDesc,
                    size: productSize,
                    brand: productBrand,
                    quantiny: productQty,
                    price: productPrice,
                    storeId: productStore,
                    image: image,
                    userId: user.id
                })
                saveProduct.save()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "message": "product saved successfully"
                        })

                    }).catch(error => {
                        console.log(error)
                        res.status(200).json({
                            "status": false,
                            "message": error
                        })
                    })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(200).json({
                "status": false,
                "message": error
            })
        })

}