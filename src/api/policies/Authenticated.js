module.exports = async function (req, res, proceed) {

    if (req.session.authenticated && req.session.user) {
        return proceed();
    }
    console.log('New visitor from: ' + req.ip + ' at: ' + req.originalUrl);
    return res.view('pages/login', { layout: 'layouts/login' });

};