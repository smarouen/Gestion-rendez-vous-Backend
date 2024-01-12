const router = require("express").Router();
const Event = require("../models/Event");
const handleError = require("../utils/eventErrors");
const verify = require('./privateRouteVerifyToken');


//get all events
/********************************************************* */
router.get("/", verify ,async (req, res) => {
    try {
        const events = await Event.find({});
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});



//get speceif event with ID
/********************************************************* */
router.get("/:id/show", verify ,async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findById(id);
        res.status(200).json(event);
    } catch (err) {
        handleError(err, res);
    }
});



//create new event
/********************************************************* */
router.post("/", verify ,async (req, res) => {
    console.log(req.body);
    const newEvent = new Event({
        title: req.body.title,
        date: req.body.date,
        description: req.body.description,
    });

    try {
        const savedEvent = await newEvent.save();
        res.status(200).json(savedEvent);
    } catch (err) {
        handleError(err, res);
    }
});



// update  event
/********************************************************* */
router.put("/:id/update",verify,async (req, res) => {
    const id = req.params.id;
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                date: req.body.date,
                description: req.body.description,
            },
            { new: true, runValidators: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json(updatedEvent);
    } catch (err) {
        handleError(err, res);
    }
});



//delete  event
/********************************************************* */
router.delete("/:id/delete", verify, async (req, res) => {
    const id = req.params.id;
    try {
        const deletedEvent = await Event.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json("Event has been deleted");
    } catch (err) {
        console.error("Error deleting event:", err);
        handleError(err, res);
    }
});


module.exports = router;
