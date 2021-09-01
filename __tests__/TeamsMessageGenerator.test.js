import { describe, expect, it } from '@jest/globals';
import commentStub from './comment.stub';
import FigmaComment from '../src/FigmaComment';
import TeamsMessageGenerator from '../src/TeamsMessageGenerator';

describe('Generate Teams message payload', () => {
    it('Should have basic metadata', () => {
        const comment = new FigmaComment(commentStub);
        const message = new TeamsMessageGenerator(comment);

        expect(message.toPayload()).toHaveProperty('@type', 'MessageCard');
        expect(message.toPayload()).toHaveProperty('@context', 'https://schema.org/extensions');
        expect(message.toPayload()).toHaveProperty('themeColor', 'FF0000');
        expect(message.toPayload()).toHaveProperty('title', 'New comment');
        expect(message.toPayload()).toHaveProperty('summary', 'New comment summary');
    });
});
