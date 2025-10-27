import { connect } from "mongoose";

const connectDB = async connectionURL => {
	await connect(connectionURL);
};

export default connectDB;
