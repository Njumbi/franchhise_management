exports.get404Error = (req, res, next) => {
    res.status(404).render('404.ejs')
}

exports.get505Error = (req,res, next) =>{
    res.status().render('505.ejs')
}












 












