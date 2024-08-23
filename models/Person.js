const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Person Schema for creating table
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'owner', 'manager']
    },
    address: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    Salary: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        required: true,
        type: String
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function (next) {
    const person = this;
    if (!person.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password, salt);
        person.password = hashPassword; // Fixed typo here
        next();
    } catch (err) {
        return next(err);
    }
});

personSchema.methods.comparePassword= async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password); // Fixed typo here
        return isMatch;
    } catch (err) {
        throw err;
    }
};

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
