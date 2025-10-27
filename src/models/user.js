import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
			trim: true,
		},

		lastName: {
			type: String,
			required: true,
			trim: true,
		},

		email: {
			type: String,
			unique: true,
			required: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
		},
		age: {
			type: Number,
			min: 18,
		},
		gender: {
			type: String,
			validate: value => {
				if (!["male", "female", "other"].includes(value)) {
					throw new Error("Gender data is not valid");
				}
			},
		},
		about: {
			type: String,
			default: "this is default about for user",
		},
		photoUrl: {
			type: String,
		},

		skills: {
			type: [String],
		},
	},
	{ timestamps: true }
);

const User = model("User", userSchema);

export default User;
