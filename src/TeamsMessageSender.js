import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config()

export function sendMessage (message) {
    return fetch(process.env.TEAMS_WEBHOOK_URL, {
        method: 'post',
        body: JSON.stringify(message.toPayload()),
        headers: {'Content-Type': 'application/json'}
    });
}
