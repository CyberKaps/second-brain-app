import mongoose, { mongo, Schema, model } from "mongoose";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://cyberkaps:kalpesh@cluster0.dyv70o5.mongodb.net/second-brain');

}

const objectidd = mongoose.Types.ObjectId;

const userSchema = new Schema({

    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const tagSchema = new Schema({
    title: {type: String, required: true, unique: true }
})
const contentSchema = new Schema({
    
    link: { type: String, required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    tags: [{ type: objectidd, required: true, ref: 'Tag' }],
    userId: {type:objectidd, ref: 'Users', required: true },
    // authorId: {type:objectidd, ref: 'Users', required: true }
 
});


const linkSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: objectidd, required: true, ref: 'User', unique: true}
})


export const userModel = model("Users", userSchema);
export const tagModel = model("Tags", tagSchema);
export const contentModel = model("Content", contentSchema);
export const linkModel = model("Links", linkSchema);
