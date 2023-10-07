const router = require('express').Router();
router.use('/users', require('./users'))



// module.exports = {
//     users: require('./users'),
// }
module.exports = router;