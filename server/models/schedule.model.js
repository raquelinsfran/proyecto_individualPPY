const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is mandatory"],
        minlength: [2, "First name must be at least 2 characters or more"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is mandatory"],
        minlength: [2, "Last name must be at least 2 characters or more"]
    },
    email: {
        type: String,
        required: [true, "Email is mandatory"],
        validate: {
            validator: (val) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
            message: "Please enter a valid email"
        },
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is mandatory"],
        minlength: [10, "Phone number must be at least 10 characters or more"]
    },
    date: {
        type: Date,
        required: [true, "Date is mandatory"],
    },
    studyLevel: {
        type: String,
        required: [true, "Study level is mandatory"],
    },
    studyMode: {
        type: String,
        required: [true, "Study mode is mandatory"],
    }
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', ScheduleSchema);

module.exports = Schedule;
