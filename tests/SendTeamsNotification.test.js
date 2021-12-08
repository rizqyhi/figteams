import { describe, expect, it } from '@jest/globals';
import fetch from 'node-fetch';
import commentStub from '../src/__tests__/commentWebhook.stub.js';
import FigmaComment from '../src/FigmaComment.js';
import TeamsMessageGenerator from '../src/TeamsMessageGenerator.js';

const TEAMS_WEBHOOK_URL = 'https://presentologics.webhook.office.com/webhookb2/3fbda82a-fa24-47af-952f-9f439aea0554@a266a087-622d-47cc-8c26-c15071fe3650/IncomingWebhook/18e493db4f464296b18dc93294179ebf/10a7860f-b1ad-4477-99f7-11228c24a1cf';

describe('Send Teams notification', () => {
    it('Should send the message succesfully', async () => {
        const comment = new FigmaComment(commentStub);
        const message = new TeamsMessageGenerator(comment);

        const response = await fetch(TEAMS_WEBHOOK_URL, {
            method: 'post',
            body: JSON.stringify(message.toPayload()),
            headers: {'Content-Type': 'application/json'}
        });

        await expect(response.ok).toBe(true);
    });
});
