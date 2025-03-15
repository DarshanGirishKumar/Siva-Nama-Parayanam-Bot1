const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()  // Saves session data for reuse
});

client.on('qr', qr => {
    console.log("Scan this QR code with WhatsApp to log in:");
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp bot is ready!');
    sendMessage();
});

function sendMessage() {
    const chatId = "120363393806699556@g.us"; // Replace with your group ID
    const message = "Hello! This is an automated message from my bot.";
    
    client.sendMessage(chatId, message)
        .then(() => console.log("✅ Message sent!"))
        .catch(err => console.error("❌ Error:", err));
}

client.initialize();
