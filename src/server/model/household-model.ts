import mongoose, { Schema, Document as IDocument } from 'mongoose';
import bcrypt from 'bcrypt';

import { dropAllTables, dropHouseholdTable } from '../utils/dev-utils';

interface HouseholdSchemaModel extends Household, IDocument {
}

const HouseholdSchema = new Schema<HouseholdSchemaModel>({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    householdName: { type: String, required: true }
});

// Hash the password before saving the user model
HouseholdSchema.pre<HouseholdSchemaModel>('save', async function (next) {
    const household = this;
    if (household.isModified('password')) {
        household.password = await bcrypt.hash(household.password, 8);
    }
    next();
});

const HouseholdModel = mongoose.model<HouseholdSchemaModel>('household', HouseholdSchema);

if (dropAllTables || dropHouseholdTable) {
    HouseholdModel.collection.drop();
}

export default HouseholdModel;