const is_logged_in = () => {
    return (req,res,next) => {
        if (req.user && req.isAuthenticated())
            next();
        else
            res.status(401).json('Unauthorized');
    } 
}

module.exports = {
    is_logged_in,
}