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

export const getAssertionText = (imageItem, colorName) => {
    return {
        body: [
            `The ${imageItem} is the color ${colorName}.`,
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

export const getAnswerIsCorrectText = (imageItem, colorName) => {
    return {
        body: [
            `HA!`,
            `:):)`,
            `I always knew that the ${imageItem} was the color ${colorName}.`,
            `:):)`
        ],
        buttons: [
            `What else do you know?`
        ]
    };
};

export const getColorCorrectionText = (imageItem, colorName) => {
    return {
        body: [
            `Oh wow!`,
            `That makes so much more sense that the ${imageItem} is the color ${colorName}.`,
            `Thank you so much! :):)`
        ],
        buttons: [
            `What else do you know?`
        ]
    };
};

export const getWrongText = (imageItem) => {
    return {
        body: [
            `Oh no!`,
            `:(`,
            `I'm so sorry.`,
            `You must be very smart-bot.`,
            `Would you be able to help me become smart like you?`,
            `What color is ${imageItem}?`
        ],
        buttons: [
        ]
    };
};

export const getMistakeText = (imageItem) => {
    return {
        body: [
            `That's okay! We all make mistakes.`,
            `:) ha ha.`,
            `So then what color is ${imageItem}?`
        ],
        buttons: [
        ]
    };
};

export const getCorrectionText = (imageItem, colorName) => {
    return {
        body: [
            `Oh wow...`,
            `That's interesting...`,
            `So ${imageItem} is actually the color ${colorName}?`
        ],
        buttons: [
            `No, sorry! Let me try again.`,
            `That's right!`
        ]
    };
};

export const getCorrectionMistakeText = (imageItem, colorName) => {
    return {
        body: [
            `Wait a second!`,
            `So you're saying ${imageItem} is the color ${colorName}?`,
            `But that's what I said...`,
            `And you said I was wrong!`
        ],
        buttons: [
            `My mistake, smart-bot. Let me try again.`,
            `I'm so sorry, smart-bot. You were right the first time.`
        ]
    };
};