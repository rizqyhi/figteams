import FigmaComment from '../src/FigmaComment.js';
import TeamsMessageGenerator from '../src/TeamsMessageGenerator.js';
import { sendMessage } from '../src/TeamsMessageSender.js';

export default async function handler(request, response) {
    try {
        const comment = new FigmaComment(request.body);
        const message = new TeamsMessageGenerator(comment);
        const webhookResponse = await sendMessage(message);
        
        if (webhookResponse.ok) {
            response.status(200).send('OK');
        } else {
            response.status(400).send('FAILED');
        }
    } catch (error) {
        response.status(400).send('FAILED');
    }
}
