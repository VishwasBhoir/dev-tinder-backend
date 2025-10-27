import validator from "validator";

const validateSignupData = data => {
	console.log("data testing validateSignup", data);
	const { firstName, lastName, email, password } = data;
	if (!firstName || !lastName) {
		throw new Error("Name is not valid");
	} else if (!validator.isEmail(email)) {
		throw new Error("Email is not valid");
	} else if (!validator.isStrongPassword(password)) {
		throw new Error("Please provide strong password");
	}
};

export { validateSignupData };
