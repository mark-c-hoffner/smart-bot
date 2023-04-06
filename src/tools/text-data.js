export const getWelcomeText = () => {
    return {
        body: [
            `Hi there! :):)`,
            `I'm smart-bot.`,
            `Not to toot my own horn, but some say I'm the smartest bot on the web.`,
            `Do you want to see what I know?`
        ],
        buttons: [
            `That's why I'm here!`
        ]
    };
};

export const getAssertionText = (colorName) => {
    return {
        body: [
            `This image is the color ${colorName}.`,
            ``,
            ``,
            `:)`
        ],
        buttons: [
            `Wrong`,
            `That's right!`
        ]
    };
};

export const getAnswerIsCorrectText = (colorName) => {
    return {
        body: [
            `HA!`,
            `:):)`,
            `I always knew that this image was the color ${colorName}.`,
            `:):)`
        ],
        buttons: [
            `What else do you know?`
        ]
    };
};

export const getColorCorrectionText = (colorName) => {
    return {
        body: [
            `Oh wow!`,
            `That makes so much more sense that this image is the color ${colorName}.`,
            `Thank you so much! :):)`
        ],
        buttons: [
            `What else do you know?`
        ]
    };
};

export const getWrongText = () => {
    return {
        body: [
            `Oh no!`,
            `:(`,
            `I'm so sorry.`,
            `You must be very smart-bot.`,
            `Would you be able to help me become smart like you?`,
            `What color is this image?`
        ],
        buttons: [
        ]
    };
};

export const getMistakeText = () => {
    return {
        body: [
            `That's okay! We all make mistakes.`,
            `:) ha ha.`,
            `So then what color is this image?`
        ],
        buttons: [
        ]
    };
};

export const getCorrectionText = (colorName) => {
    return {
        body: [
            `Oh wow...`,
            `That's interesting...`,
            `So this image is actually the color ${colorName}?`
        ],
        buttons: [
            `No, sorry! Let me try again.`,
            `That's right!`
        ]
    };
};

export const getCorrectionMistakeText = (colorName) => {
    return {
        body: [
            `Wait a second!`,
            `So you're saying this image is the color ${colorName}?`,
            `But that's what I said...`,
            `And you said I was wrong!`
        ],
        buttons: [
            `My mistake, smart-bot. Let me try again.`,
            `I'm so sorry, smart-bot. You were right the first time.`
        ]
    };
};