import FigmaComment from '../src/FigmaComment.js';
import TeamsMessageGenerator from '../src/TeamsMessageGenerator.js';
import { sendMessage } from '../src/TeamsMessageSender.js';

function isValidRequest(request) {
    if (request.method !== 'POST') {
        throw Error('INVALID_METHOD');
    }

    if (!request.body) {
        throw Error('EMPTY_BODY');
    }

    if (!request.body.passcode || request.body.passcode !== process.env.WEBHOOK_PASSCODE) {
        throw Error('INVALID_PASSCODE');
    }
}

export default async function handler(request, response) {
    try {
        isValidRequest(request)

        const comment = new FigmaComment(request.body);
        const message = new TeamsMessageGenerator(comment);
        const webhookResponse = await sendMessage(message);
        
        if (webhookResponse.ok) {
            response.status(200).send('OK');
        } else {
            response.status(400).send('FAILED');
        }
    } catch (error) {
        response.status(400).send(error.message);
    }
}
