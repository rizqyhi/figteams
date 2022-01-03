import FigmaComment from '../src/FigmaComment';
import TeamsMessageGenerator from '../src/TeamsMessageGenerator';
import { sendMessage } from '../src/TeamsMessageSender';

export default function handler(request, response) {
    const comment = new FigmaComment(request.body);
    const message = new TeamsMessageGenerator(comment);
    const response = await sendMessage(message);
    
    if (response.ok) {
        response.status(200).send('OK');
    } else {
        response.status(400).send('FAILED');
    }
}
