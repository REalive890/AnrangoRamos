var express = require('express');
var router = express.Router();

router.get('/scelta', function (req, res, next) {
    res.render('scelta', { title: 'Scelta' });
});
router.get('/domande', function (req, res, next) {
    res.render('test', { title: 'Test' });
});
router.get('/correzione', function (req, res, next) {
    res.render('correggi', {title:'Correggi'})
})

module.exports = router;