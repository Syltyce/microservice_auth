const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');  // Importation du package
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator, { message: 'Cet email est déjà utilisé.' });

// Middleware Mongoose "pre-save" pour hacher le mot de passe avant de sauvegarder
userSchema.pre('save', async function(next) {
    // Vérifie si le mot de passe a été modifié ou si c'est un nouvel utilisateur
    if (this.isModified('password')) {
        try {
            // Génére un "salt"
            const salt = await bcrypt.genSalt(10);
            // Hacher le mot de passe avec le "salt"
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            return next(error); // Si erreur, l'envoi de l'erreur au middleware suivant
        }
    } else {
        // Si le mot de passe n'a pas changé, on passe au middleware suivant
        next();
    }
});

// Méthode pour comparer les mots de passe (utilisée lors de la connexion)
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
