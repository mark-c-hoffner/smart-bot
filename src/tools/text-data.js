export const getWelcomeText = () => {
    return [
        `Hi there! :):)`,
        `I'm smart-bot.`,
        `Not to toot my own horn, but some say I'm the smartest bot on the web.`,
        `Do you want to see what I know?`
    ];
};

export const getAssertionText = (imageItem, colorName) => {
    return [
        `The ${imageItem} is the color ${colorName}.`,
        ``,
        ``,
        `:)`
    ];
};

export const getAnswerIsCorrectText = (imageItem, colorName) => {
    return [
        `HA!`,
        `:):)`,
        `I always knew that the ${imageItem} was the color ${colorName}.`,
        `:):)`
    ];
};

export const getColorCorrectionText = (imageItem, colorName) => {
    return [
        `Oh wow!`,
        `That makes so much more sense that the ${imageItem} is the color ${colorName}.`,
        `Thank you so much! :):)`
    ];
};

export const getWrongText = (imageItem) => {
    return [
        `Oh no!`,
        `:(`,
        `I'm so sorry.`,
        `You must be very smart-bot.`,
        `Would you be able to help me become smart like you?`,
        `What color is ${imageItem}?`
    ];
};

export const getMistakeText = (imageItem) => {
    return [
        `That's okay! We all make mistakes.`,
        `:) ha ha.`,
        `So then what color is ${imageItem}?`
    ];
};

export const getCorrectionText = (imageItem, colorName) => {
    return [
        `Oh wow...`,
        `That's interesting...`,
        `So ${imageItem} is actually the color ${colorName}?`
    ];
};

export const getCorrectionMistakeText = (imageItem, colorName) => {
    return [
        `Wait a second!`,
        `So you're saying ${imageItem} is the color ${colorName}?`,
        `But that's what I said...`,
        `And you said I was wrong!`
    ];
};