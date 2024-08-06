const mongoose = require('mongoose');

const connect = mongoose.connect("mongodb://127.0.0.1:27017/database1", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {
    console.log("Database connected successfully.");
}).catch((error) => {
    console.error("Error connecting to database:", error.message);
});

const LoginSchema = new mongoose.Schema ({
    name: { type: String, required: true },
    password: { type: String, required: true }
});
const AppointmentSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    contact: {type: String, required: true},
    date: {type: Date, required: true},
    slot: {type: String, required: true},
    reason: {type: String}
})

const collection = new mongoose.model("users", LoginSchema);
const collection2 = new mongoose.model("appointments", AppointmentSchema);

module.exports = { collection, collection2 };