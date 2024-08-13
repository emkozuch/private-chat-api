import mongoose, { Document, Model, Schema } from 'mongoose';

interface IAccessRequest extends Document {
  email: string;
}
const accessRequestSchema: Schema<IAccessRequest> = new Schema({
  email: { type: String, required: true },
});

export const AccessRequest: Model<IAccessRequest> =
  mongoose.model<IAccessRequest>('AccessRequest', accessRequestSchema);
