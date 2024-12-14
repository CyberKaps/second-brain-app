import mongoose, { mongo, Schema, model } from "mongoose";

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('');

}

const ObjetId = mongoose.Types.ObjectId;

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
    tags: [{ type: ObjetId, required: true, ref: 'Tag' }],
    userId: {type:ObjetId, ref: 'User', required: true }
 
});


const linnkSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: ObjetId, required: true, ref: 'User'}
})


export const userModel = model("Users", userSchema);
const tagModel = model("Tags", tagSchema);
const contentModel = model("Content", contentSchema);
const linkModel = model("Links", linnkSchema);
