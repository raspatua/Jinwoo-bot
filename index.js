async function autoViewStatus(sock) {
    try {
        if (!global.autoStatusView) return;
        
        sock.ev.on("chats.update", async (chatUpdate) => {
            for (let chat of chatUpdate) {
                if (chat.presences) {
                    for (let jid in chat.presences) {
                        if (jid.endsWith("@s.whatsapp.net")) {
                            console.log(`Viewing status: ${jid}`);
                            await sock.readMessages([{
                                remoteJid: jid,
                                id: '',
                                participant: jid
                            }]);
                        }
                    }
                }
            }
        });

        console.log("✅ Auto Status View enabled.");
    } catch (error) {
        console.error("❌ Error in auto status view:", error);
    }
}

// Inside your bot startup function, add:
async function startBot() {
    const sock = makeWASocket({ /* your existing connection settings */ });
    autoViewStatus(sock); // Enable Auto Status View
}
