const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Hachage du mot de passe avant enregistrement
// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

// Méthode pour comparer les mots de passe
// userSchema.methods.comparePassword = async function (password) {
//     return await bcrypt.compare(password, this.password);
// };

module.exports = mongoose.model('User', userSchema);
