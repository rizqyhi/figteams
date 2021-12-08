import { expect } from '@jest/globals';
import commentStub from './commentWebhook.stub.js';
import members from '../members.json';

import FigmaComment from '../FigmaComment.js'

test('Generate correct FigmaComment object', () => {
    const comment = new FigmaComment(commentStub);
    const commenterAvatarUrl = members.find(member => member.id === comment.commenterId()).img_url;

    expect(comment.commentId()).toEqual('105026100');
    expect(comment.commenterId()).toEqual('887649301844316340');
    expect(comment.commenterName()).toEqual('Lalu Aan');
    expect(comment.fileKey()).toEqual('4L0DzgXXgAfjSrnsRsR1XP');
    expect(comment.fileName()).toEqual('Semicolon - Playground - Component Name Exploration');
    expect(comment.comment()).toEqual("Rizqy test\n");
    expect(comment.commenterAvatarUrl()).toEqual(commenterAvatarUrl);
});

test('When commenter avatar is not available, then should return fallback avatar', () => {
    commentStub.triggered_by.id = '123456789';
    const comment = new FigmaComment(commentStub);

    expect(comment.commenterId()).toEqual('123456789');
    expect(comment.commenterAvatarUrl()).toEqual('');
});
