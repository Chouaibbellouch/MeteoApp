require('dotenv').config();
const axios = require('axios');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/city-image', async (req, res) => {
    const { city } = req.query;
    const apiKey = process.env.UNSPLASH_ACCESS_KEY;
    const url = `https://api.unsplash.com/search/photos`;

    try {
        const response = await axios.get(url, {
            params: {
                query: city,
                client_id: apiKey
            }
        });
        const imageUrl = response.data.results[0]?.urls?.regular; // Sélectionnez la première image
        res.json({ imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération de l'image" });
    }
});


app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des données météo" });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
