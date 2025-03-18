require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
    const { nombre, empresa, email, telefono, mensaje } = req.body;

    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'tatenguelmr@gmail.com',
            subject: 'Nuevo mensaje de contacto',
            text: `Nombre: ${nombre}\nEmpresa: ${empresa}\nEmail: ${email}\nTeléfono: ${telefono}\nMensaje: ${mensaje}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Correo enviado con éxito" });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        res.status(500).json({ success: false, message: "Error al enviar el correo" });
    }
});

module.exports = app;
