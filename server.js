import dotenv from "dotenv";
import connectDB from "./src/config/database.js";
import app from "./src/app.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

connectDB(MONGO_URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running on port: ${PORT}`);
		});
		console.log("✅ MongoDB connected");
	})
	.catch(err => {
		console.error("❌ MongoDB connection failed:", err.message);
	});
