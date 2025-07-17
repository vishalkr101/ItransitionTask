import mongoose from 'mongoose';

const drugSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  genericName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  brandName: {
    type: String,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
});

const Drug = mongoose.model('Drug', drugSchema);

export default Drug;
