import mongoose, { Schema, Document as IDocument } from 'mongoose';
import bcrypt from 'bcrypt';

interface HouseholdSchemaModel extends Household, IDocument {
    getByEmail: (email: string) => Promise<Household>
}

const HouseholdSchema = new Schema<HouseholdSchemaModel>({
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    title: { type: String, required: true }
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

export default HouseholdModel;