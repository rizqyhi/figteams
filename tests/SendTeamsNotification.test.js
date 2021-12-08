import dotenv from 'dotenv';
import { describe, expect, it } from '@jest/globals';
import fetch from 'node-fetch';
import commentStub from '../src/__tests__/commentWebhook.stub.js';
import FigmaComment from '../src/FigmaComment.js';
import TeamsMessageGenerator from '../src/TeamsMessageGenerator.js';

dotenv.config()

describe('Send Teams notification', () => {
    it('Should send the message succesfully', async () => {
        const comment = new FigmaComment(commentStub);
        const message = new TeamsMessageGenerator(comment);

        const response = await fetch(process.env.TEAMS_WEBHOOK_URL, {
            method: 'post',
            body: JSON.stringify(message.toPayload()),
            headers: {'Content-Type': 'application/json'}
        });

        expect(response.ok).toBe(true);
    });
});
