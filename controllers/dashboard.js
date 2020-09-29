const User = require('../models/users');
const bycrypt = require('bcrypt')

exports.getDashboardPage = (req, res, next) => {

    var user = req.session.user;

    res.render('dashboard.ejs', {
        //   name: user.firstName + " " + user.secondName,
        path: 'home'

    })
}

exports.getLogOut = (req, res, next) => {
    console.log("heey")
    //req.flash("logout_message", "you have successfully been logged out")
    req.session.destroy()
    res.redirect('/login')
}

exports.getUsers = (req, res, next) => {
    res.render('users.ejs', {
        path: 'users'
    })
}
exports.getUsersData = (req, res, next) => {
    User.findAll()
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
exports.postAddUser = (req, res, next) => {
    //collect our data
    const firstName = req.body.firstname;
    const secondName = req.body.secondName;
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body)

    // check if user exists
    User.findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            // if user is not null he/she exists
            if (user) {
                res.status(200).json({
                    "status": false,
                    "message": 'User by email ' + user.email + ' already exists'
                })
            } else {
                //store data to db
                bycrypt.hash(password, 12, (err, encryptedpassword) => {
                    if (err) {
                        return
                    }
                    // how to insert data tour table
                    const newUser = new User({
                        firstName: firstName,
                        secondName: secondName,
                        email: email,
                        role: 2,
                        password: encryptedpassword

                    })

                    newUser
                        .save()
                        .then(() => {
                            res.status(200).json({
                                "status": true,
                                "message": "user succesfully added"
                            });
                        })
                        .catch(error => {
                            console.log(error)
                            res.status(200).json({
                                "status": false,
                                "message": error
                            })
                        });
                })
            }
        })
        .catch(e => {
            console.log(e)

            res.status(200).json({
                status: false,
                message: e
            })
        })
}
exports.getDeleteUser = (req, res, next) => {
    const firstName = req.query.firstName;
    const email = req.query.email;
    const role = req.query.role;
    User.destroy({
            where: {
                email: email,
                firstName: firstName,
                role: 2,
            }
        })
        .then((user) => {
            if (user === 1) {
                res.status(200).json({
                    status: true,
                    message: "Deleted " + firstName + " successfully"
                });
            } else {
                res.status(200).json({
                    status: false,
                    message: "Admin can't be deleted"
                })
            }
        })
        .catch(function (error) {
            res.status(200).json({
                status: false,
                message: error
            })
        })

}