import mongoose from 'mongoose';
const { Schema, model } = mongoose;

/*source: https://www.mongodb.com/docs/drivers/node/current/integrations/mongoose-get-started/*/

const userSchema = new Schema({
    username: String,
    name: String,
    email: String,
    phone: String,
    photo: Buffer,
    styleTags: [String],
});

const User = model('User', userSchema);
export default User;