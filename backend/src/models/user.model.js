import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    password: {
        type: String
    },
    mobile: {
        type: String,
        unique: true,
        sparse: true
    },
    role: {
        type: String,
        enum: ["user", "lawyer"],
        required: true
    },
    preferredLanguage: {
        type: String,
        default: "English"
    }
}, { timestamps: true });

/* Hash password before saving (only for email/password users) */
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

/* Compare password (for login) */
userSchema.methods.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
