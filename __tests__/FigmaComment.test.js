import { expect } from '@jest/globals';
import commentStub from './comment.stub';

test('Generate correct FigmaComment object', () => {
    const comment = new FigmaComment(commentStub);

    expect(comment.commentId()).toEqual('105026100');
    expect(comment.commenterId()).toEqual('887649301844316340');
    expect(comment.commenterName()).toEqual('Lalu Aan');
    expect(comment.fileKey()).toEqual('4L0DzgXXgAfjSrnsRsR1XP');
    expect(comment.fileName()).toEqual('Semicolon - Playground - Component Name Exploration');
    expect(comment.comment()).toEqual("Rizqy test\n");
});
