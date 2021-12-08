import { describe, expect, it } from '@jest/globals';
import commentStub from './commentWebhook.stub.js';
import FigmaComment from '../FigmaComment.js';
import TeamsMessageGenerator from '../TeamsMessageGenerator.js';

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

    it('Should have one message section', () => {
        const comment = new FigmaComment(commentStub);
        const message = new TeamsMessageGenerator(comment);

        expect(message.toPayload()).toHaveProperty('sections');
        expect(message.toPayload().sections.length).toEqual(1);
    });

    it('Should have correct comment metadata', () => {
        const comment = new FigmaComment(commentStub);
        const message = new TeamsMessageGenerator(comment);

        expect(message.toPayload().sections[0].activityTitle).toEqual(comment.commenterName());
        expect(message.toPayload().sections[0].activitySubtitle).toEqual(comment.formattedTimestamp());
        expect(message.toPayload().sections[0].activityImage).toEqual(comment.commenterAvatarUrl());
    });

    it('Should have correctly formatted comment text', () => {
        const comment = new FigmaComment(commentStub);
        const message = new TeamsMessageGenerator(comment);

        expect(message.toPayload().sections[0].text).toEqual(comment.comment());
    });

    it('Should have comment related information', () => {
        const comment = new FigmaComment(commentStub);
        const message = new TeamsMessageGenerator(comment);

        expect(message.toPayload().sections[0].facts[0].name).toEqual('File');
        expect(message.toPayload().sections[0].facts[0].value).toEqual(comment.fileName());
    });

    it('Should have an action button to reply the comment on Figma', () => {
        const comment = new FigmaComment(commentStub);
        const message = new TeamsMessageGenerator(comment);

        expect(message.toPayload().potentialAction[0]).toEqual({
            '@type': 'OpenUri',
            name: '💬 Reply Comment',
            targets: [
                {
                    os: 'default',
                    uri: 'https://www.figma.com/file/4L0DzgXXgAfjSrnsRsR1XP#105026100'
                }
            ]
        });
    });
});
