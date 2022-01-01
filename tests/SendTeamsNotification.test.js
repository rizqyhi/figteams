import { describe, expect, it } from '@jest/globals';
import commentStub from '../src/__tests__/commentWebhook.stub';
import FigmaComment from '../src/FigmaComment';
import TeamsMessageGenerator from '../src/TeamsMessageGenerator';
import { sendMessage } from '../src/TeamsMessageSender';

describe('Send Teams notification', () => {
    it('Should send the message succesfully', async () => {
        const comment = new FigmaComment(commentStub);
        const message = new TeamsMessageGenerator(comment);
        const response = await sendMessage(message);

        expect(response.ok).toBe(true);

        return response;
    });
});
