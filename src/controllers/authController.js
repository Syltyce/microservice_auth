const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Fonction Inscription 
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log('Inscription reçu :', email, password);


        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email existe déjà' });
        }

        // Créer un nouvel utilisateur
        const user = new User({ email, password });
        await user.save();
        // console.log('Utilisateur créé:', user);

        res.status(201).json({ message: 'Utilisateur enregistré avec succès' });
    } catch (error) {
        // console.error('Erreur Inscription :', error);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
};

// Fonction Connexion
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Received login request:', email, password);


        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur pas trouvé' });
        }

        // Vérifier le mot de passe BRUT
        if (user.password !== password) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }

        // Vérifier le mot de passe HASH
        // const isPasswordValid = await user.comparePassword(password);
        // if (!isPasswordValid) {
        //     return res.status(401).json({ message: 'Mot de passe incorrect' });
        // }

        // Générer un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Erreur Serveur' });
    }
};

module.exports = { register, login };
