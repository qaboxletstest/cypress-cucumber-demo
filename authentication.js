const simpleAuth = (req, res, next) => {
    const auth = { login: 'adminS3rcet', password: 'adminS3rcet' }
    const login = req.body.username
    const password = req.body.password
    if (login && password && login === auth.login && password === auth.password) {
        // Access granted...
        return next()
    } else {

    }
    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).json({ error: 'unauthorized' })
}

module.exports = simpleAuth