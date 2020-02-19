import mongoose, { Schema, Document as IDocument } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface HouseholdSchemaModel extends Household, IDocument {
    generateAuthToken: () => Promise<string>;
}

const HouseholdSchema = new Schema<HouseholdSchemaModel>({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
});

HouseholdSchema.pre<HouseholdSchemaModel>('save', async function (next) {
    // Hash the password before saving the user model
    const household = this;
    if (household.isModified('password')) {
        household.password = await bcrypt.hash(household.password, 8);
    }
    next();
});

HouseholdSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const household = this;
    const token = jwt.sign({ email: household.email }, 'secret');
    await household.save();
    return token;
};

const HouseholdModel = mongoose.model<HouseholdSchemaModel>('Household', HouseholdSchema);

export default HouseholdModel;