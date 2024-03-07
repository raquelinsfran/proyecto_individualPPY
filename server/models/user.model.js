const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email es obligatorio"],
        validate: {
            validator: (val) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val),
            message: "Por favor introduzca un email válido"
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Contraseña es obligatorio"],
        minlength: [8, "Contraseña debe tener al menos 8 caracteres o más"]
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin", "superAdmin"],
        default: "user"
    }

}, { timestamps: true, versionKey: false });

UserSchema.plugin(uniqueValidator, { message: 'Email {VALUE} ya fue tomado' });

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'La contraseña debe coincidir con confirmar contraseña');
    }
    next();
});

UserSchema.pre('save', function (next) {
    this.role = "user"
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

UserSchema.pre(["findOneAndUpdate"], async function (next) {
    const data = this.getUpdate();
    if (data.password) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(data.password, salt);
            data.password = hash;
            next();
        } catch (error) {
            next(error);
        }
    }
    next();
});

const User = new mongoose.model("User", UserSchema);

module.exports = User;