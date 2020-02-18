import mongoose, { Schema, Document as IDocument } from 'mongoose';

interface HouseholdSchemaModel extends Household, IDocument { }

const HouseholdSchema = new Schema({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
});

const HouseholdModel = mongoose.model<HouseholdSchemaModel>('Household', HouseholdSchema);

HouseholdModel.collection.drop();

export default HouseholdModel;