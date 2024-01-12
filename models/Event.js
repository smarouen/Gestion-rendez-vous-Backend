const moment = require("moment");
const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
    title: {type: String, required: true},
    date: {
        type: Date,
        required: [true, "Please Insert The Date and Time of your event"],
        validate: {
            validator: function (value) {
                // Validate that the date is not in the past
                return moment(value).isSameOrAfter(moment());
            },
            message: "Event Date and Time must be at or after the current date and time",
        },
    },
    description: { type: String},
});

module.exports = mongoose.model("Event", EventSchema);
