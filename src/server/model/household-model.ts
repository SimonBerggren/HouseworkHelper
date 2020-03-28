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

// Hash the password before saving the household
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

//////////////////////////////// OPERATIONS ////////////////////////////////

export const findHousehold = async (email: string): Promise<Household & IDocument> => {
    const household = await HouseholdModel.findOne({ email });

    if (!household) {
        throw 'Unable to find household';
    }

    return household;
};

// dev
export const findHouseholds = async (): Promise<(Household & IDocument)[]> => {
    const households = await HouseholdModel.find();

    return households;
};

export const findHouseholdByID = async (id: string): Promise<Household & IDocument> => {
    const household = await HouseholdModel.findOne({ _id: id });

    if (!household) {
        throw 'Unable to find household';
    }

    return household;
};

export const createHousehold = async (email: string, householdName: string, password: string): Promise<Household> => {
    const createdHousehold = await HouseholdModel.create({ email, householdName, password });

    if (!createdHousehold) {
        throw 'Unable to create household';
    }

    return createdHousehold;
};
export const updateHousehold = async (householdID: string, householdName: string, household: Household): Promise<Household> => {
    const updatedHousehold = await HouseholdModel.updateOne({ householdID, householdName }, { householdID, ...household });

    if (!updatedHousehold) {
        throw 'Unable to update household';
    }

    return updatedHousehold;
};