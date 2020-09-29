//import model
const User = require('../models/users');
const bycrypt = require('bcrypt');

//function to load login ejs page
exports.getLoginPage = (req, res, next) => {
    res.render('login.ejs', {
        error_message: "",
        success_message: ""

    })
}

exports.postLogin = (req, res, next) => {
    //get data from form
    const email = req.body.email;
    const password = req.body.password;


    //login user using an object where with another object inside it that has the column keyword and const from post request
    User.findOne({
            where: {
                email: email
            }
        })
        .then(user => {
            bycrypt.compare(password, user.password, (error, response) => {
                if (error) {
                    res.render('login.ejs', {
                        error_message: "invalid credentials",
                        success_message: ""

                    })
                } else {
                    console.log(user)

                    req.session.loggedIn = true
                    req.session.user = user

                    req.session.save(error => {
                        res.redirect('/')
                    })

                }
            })

        })
        .catch(error => {
            console.log(error)
            res.render('login.ejs', {
                error_message: "email not found",
                success_message: ""

            })
        })
}

exports.registerPage = (req, res, next) => {
    res.render('registration.ejs', {
        error_message: "",
        success_message: ""
    })

}

exports.postadd_User = (req, res, next) => {
    const firstName = req.body.first_name;
    const secondName = req.body.second_name;
    const emailaddress = req.body.emailaddress;
    const password = req.body.password;
    const confirmPassword = req.body.confirm_password;

    //check if passwords match
    if (password != confirmPassword) {
        res.render('registration.ejs', {
            error_message: 'passwords dont match',
            success_message: ""
        })
        return
    }
    //hash the password first
    bycrypt.hash(password, 12, (err, encryptedpassword) => {
        if (err) {
            return
        }
        // how to insert data tour table
        const newUser = new User({
            firstName: firstName,
            secondName: secondName,
            email: emailaddress,
            role: 1,
            password: encryptedpassword

        })

        newUser
            .save()
            .then(() => {
                res.redirect('/login');
            })
            .catch(error => {
                console.log(error)
                res.render('registration.ejs', {
                    error_message: error.message,
                    success_message: ""
                })
            });


    })
}