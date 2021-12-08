import members from './members';

export default class FigmaComment {
    constructor(rawComment) {
        this.rawComment = rawComment;
    }

    commentId() {
        return this.rawComment.comment_id;
    }

    formattedTimestamp() {
        return this.rawComment.created_at;
    }

    commenterId() {
        return this.rawComment.triggered_by.id;
    }

    commenterName() {
        return this.rawComment.triggered_by.handle;
    }

    commenterAvatarUrl() {
        const member = members.find(member => member.id === this.commenterId());
        const commenterNameFirstLetter = this.commenterName().toLowerCase().substring(0, 1)

        return member
            ? member.img_url
            : `https://s3-alpha.figma.com/static/user_${commenterNameFirstLetter}_v2.png`;
    }

    fileKey() {
        return this.rawComment.file_key;
    }

    fileName() {
        return this.rawComment.file_name;
    }

    comment() {
        return this.rawComment.comment.reduce((comment, segment) => {
            if (segment.mention) {
                const mentioned = this.rawComment.mentions.find(user => user.id === segment.mention);

                return comment + mentioned.handle;
            }

            return comment + segment.text;
        }, '');
    }

    replyUrl() {
        return `https://www.figma.com/file/${this.fileKey()}#${this.commentId()}`;
    }
}
