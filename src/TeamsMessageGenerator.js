export default class TeamsMessageGenerator {
    constructor(comment) {
        this.comment = comment
    }

    toPayload() {
        return {
            '@type': 'MessageCard',
            '@context': 'https://schema.org/extensions',
            themeColor: 'FF0000',
            title: 'New comment',
            summary: 'New comment summary',
            sections: [{
                activityTitle: this.comment.commenterName(),
                activitySubtitle: this.comment.formattedTimestamp(),
                activityImage: this.comment.commenterAvatarUrl(),
                text: this.comment.comment(),
                facts: [{
                    name: 'File',
                    value: this.comment.fileName()
                }],
            }]
        }
    }
}
