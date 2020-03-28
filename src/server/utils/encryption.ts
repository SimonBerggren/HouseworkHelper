import bcrypt from 'bcrypt';

export const encrypt = async (text: string): Promise<string> => bcrypt.hash(text, 8);