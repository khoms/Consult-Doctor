const express = require('express')


const { getHealthCenters, getHealthCenter,createHealthCenter, updateHealthCenter, deleteHealthCenter,healthCenterPhotoUpload } 
= require('../controller/healthCenter');

const router = new express.Router();
router.route('/').get(getHealthCenters).post(createHealthCenter);

router.route('/:id').get(getHealthCenter).put(updateHealthCenter).delete(deleteHealthCenter);

router.route('/:id/photo').put(healthCenterPhotoUpload);
// router.post('/users', async (req, res) => {
//     const user = new HealthCenter(req.body)

//     try {
//         await HealthCenter.save()
//         res.status(201).send(HealthCenter)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.get('/users', async (req, res) => {
//     try {
//         const users = await HealthCenter.find({})
//         res.send(users)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id

//     try {
//         const HealthCenter = await HealthCenter.findById(_id)

//         if (!HealthCenter) {
//             return res.status(404).send()
//         }

//         res.send(HealthCenter)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const HealthCenter = await HealthCenter.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

//         if (!HealthCenter) {
//             return res.status(404).send()
//         }

//         res.send(HealthCenter)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.delete('/users/:id', async (req, res) => {
//     try {
//         const HealthCenter = await HealthCenter.findByIdAndDelete(req.params.id)

//         if (!HealthCenter) {
//             return res.status(404).send()
//         }

//         res.send(HealthCenter)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

module.exports = router