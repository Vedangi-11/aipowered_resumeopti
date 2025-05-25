const express = require('express');
const { addJob, getJob, updatejob, deletejob, jobid ,jobbytitle} = require('../controllers/jobController');
const multer = require('multer');
const storage = require('../middlewares/multer');

const uploads = multer({ storage: storage('companyLogo') }).fields([
    { name: 'companyLogo', maxCount: 1 },
]);

const router = express.Router();

router.get('/getjobs', getJob);
router.post('/addjobs', uploads, addJob);
router.put('/updatejob/:id',updatejob);
router.delete('/deletejob/:id', deletejob);
router.get('/getjobbyid/:id',jobid);
router.get('/jobbyname', jobbytitle)
module.exports = router;