import mongoose from 'mongoose';
const { Schema, model } = mongoose;

/*source: https://www.mongodb.com/docs/drivers/node/current/integrations/mongoose-get-started/*/

const userSchema = new Schema({
    uid: { type: String, required: true, unique: true},
    name: String,
    email: { type: String, required: true, unique: true },
    picture: Buffer
});

const User = model('User', userSchema);
export default User;