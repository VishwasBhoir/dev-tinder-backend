import express from "express";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import { validateSignupData } from "./utils/validation.js";
import validator from "validator";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
	try {
		const userData = req.body;
		validateSignupData(userData);

		const { firstName, lastName, email, password } = userData;
		const passwordHash = await bcrypt.hash(password, 10);
		console.log("passwordHash", passwordHash);

		const user = new User({
			firstName,
			lastName,
			email,
			password: passwordHash,
		});
		await user.save();
		res.status(201).json({ message: "User created successfully", data: user });
	} catch (err) {
		res.status(500).json({
			message: "Error saving user",
			error: err.message,
		});
	}
});

app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!validator.isEmail(email)) {
			throw new Error("Invalid Email");
		}

		const user = await User.findOne({ email });

		if (!user) {
			throw new Error("Invalid Credentials");
		}

		const hashMatch = await bcrypt.compare(password, user.password);

		if (!hashMatch) {
			throw new Error("Invalid Credentials");
		}
		res.status(200).json({ Message: "User logged in successfully" });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Error while login user", ERROR: err.message });
	}
});

app.get("/users/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ message: "User fetched Successfully", user });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching user", error: error.message });
	}
});

app.get("/users", async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).json({ message: "users fetched successfully", users });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error fetching Users", error: error.message });
	}
});

app.patch("/users/:id", async (req, res) => {
	console.log("api hit... req.body--", req.body);
	try {
		console.log("into try");
		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, runValidators: true } // return updated doc & validate schema
		);
		console.log("updated user:", updatedUser);

		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}

		res
			.status(200)
			.json({ message: "User updated successfully", data: updatedUser });
	} catch (err) {
		res
			.status(400)
			.json({ message: "Error updating user", error: err.message });
	}
});

app.delete("/users/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			res.status(404).json({ message: "User not found" });
		}
		await user.deleteOne();
		res.status(200).json({ message: "User deleted successfully." });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Error deleting user.", error: err.message });
	}
});

export default app;
