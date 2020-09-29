exports.isUserLoggedIn = (req, res, next) => {
    if (!req.session.loggedIn) {
        res.redirect('/login')
    } else {
        next()
    }
}