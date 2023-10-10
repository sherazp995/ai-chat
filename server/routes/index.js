const express = require('express');
const router = express.Router();

router.use('/users', require('./users'))
router.use('/conversations', require('./conversations'))



// module.exports = {
//     users: require('./users'),
//     // conversations: 
// }
module.exports = router;