const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Fonction Inscription 
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Received registration request:', email, password);


        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email existe déjà' });
        }

        // Créer un nouvel utilisateur
        const user = new User({ email, password });
        await user.save();
        console.log('User created:', user);

        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
};

// Fonction Connexion
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur pas trouvé' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid mot de passe' });
        }

        // Générer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erreur Serveur' });
    }
};

module.exports = { register, login };
