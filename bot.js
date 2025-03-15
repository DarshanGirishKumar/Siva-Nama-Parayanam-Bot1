const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Use LocalAuth to save the session so you don't need to scan QR every time
const client = new Client({
    authStrategy: new LocalAuth()  // Uses saved session from the previous run
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
