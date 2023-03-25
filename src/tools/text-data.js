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