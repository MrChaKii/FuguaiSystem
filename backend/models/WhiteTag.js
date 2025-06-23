const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const whiteTagSchema = new mongoose.Schema({
    EmployeeID: {
        type: String,
        required: true,
    },
    detectedName: {
        type: String,
        required: true,
    },
    detectedDate: {
        type: Date,
        required: true,
    },
    correctedDate: {
        type: Date,
        required: true,
    },
    Solved_E_P_F_No: {
        type: String,
        required: true,
    },
    Solved_name: {
        type: String,
        required: true,
    },
    fuguai_details: {
        type: String,
        required: true,
    },
    lineNo: {
        type: String,
        required: true,
    },
    deptMachine: {
        type: String,
        required: true,
    },
    rectification: {
        type: String,
        required: true,
    },
    other: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Completed', 'Pending'],
        default: 'Pending',
    },
});
whiteTagSchema.plugin(AutoIncrement, { inc_field: 'whiteTagID' });

const WhiteTag = mongoose.model('WhiteTag', whiteTagSchema);