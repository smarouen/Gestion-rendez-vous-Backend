const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');
const verify = require('./privateRouteVerifyToken');



//get all tags
router.get("/getTag", verify ,async (req, res) => {
    try {
        const tags = await Tag.find({});
        res.status(200).json(tags);
    } catch (err) {
        res.status(400).send(err);
    }
});


//get speceif tag 
/********************************************************* */
router.get("/:id/show", verify ,async (req, res) => {
    const id = req.params.id;
    try {
        const tag = await Tag.findById(id);
        res.status(200).json(event);
    } catch (err) {
        res.status(400).send(err);
    }
});


//Create new Tag 
router.post("/add", verify, async (req, res) => {
    console.log(req.body);

    const newTag = new Tag({
        name: req.body.name,
        color: req.body.color,
    });

    try {
        // Extract the user ID from the authentication token
        newTag.user = req.user._id;

        const savedTag = await newTag.save();
        res.status(200).json(savedTag);
    } catch (err) {
        handleEventErrors(err, res);
    }
});



//update event
router.put("/:id/update",verify,async (req, res) => {
    const id = req.params.id;
    try {
        const updatedTag = await Tag.findByIdAndUpdate(
            id,
            {

                name: req.body.name,
                color: req.body.color,
            },
            { new: true, runValidators: true }
        );

        if (!updatedTag) {
            return res.status(404).json({ error: "Tag not found" });
        }

        res.status(200).json(updatedTag);
    } catch (err) {
        res.status(400).send(err);
    }
});


//Delete Tag
router.delete("/:id/delete", verify, async (req, res) => {
    const id = req.params.id;
    try {
        const tag = await Tag.findById(id);

        if (!tag) {
            return res.status(404).json({ error: "Tag not found" });
        }

        await Tag.findOneAndDelete({ _id: id }); // Use findOneAndDelete

        res.status(200).json({ message: "Tag has been deleted" });
    } catch (err) {
        console.error("Error deleting tag:", err);
        res.status(400).send(err);
    }
});



module.exports = router;
