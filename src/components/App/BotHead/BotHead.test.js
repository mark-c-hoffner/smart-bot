import React from 'react';
import { fireEvent, render } from '@testing-library/react';

const botEyesMock = jest.fn();
const botMouthMock = jest.fn();

describe('BotHead', () => {

    let BotHead;

    beforeEach(async () => {
        jest.doMock('./BotEyes', () => botEyesMock)
        jest.doMock('./BotMouth', () => botMouthMock)

        botEyesMock.mockReturnValue(<>botEyesMock</>);
        botMouthMock.mockReturnValue(<>botMouthMock</>);

        const obj = await import('./BotHead.jsx');
        BotHead = obj.default;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        render(<BotHead />);
    });

    it('displays botEyes and passes prop', () => {
        const { getByText } = render(<BotHead bootupCompletionCallback={"bootupCompletionCallback"}/>);
        expect(getByText(/botEyesMock/)).toBeTruthy();
        expect(botEyesMock.mock.lastCall[0].bootupCompletionCallback).toBe("bootupCompletionCallback");
    })

    it('displays botMouth and passes prop', () => {
        const { getByText } = render(<BotHead isAnimatingMouth={true}/>);
        expect(getByText(/botMouthMock/)).toBeTruthy();
        expect(botMouthMock.mock.lastCall[0].isAnimatingMouth).toBe(true);
    })

    it('starts the grid-container invisible', () => {
        const { getByTestId } = render(<BotHead />);
        expect(getByTestId("grid-container").className).toBe("grid-container notVisible");
    });

    it('makes the grid-container visible', () => {
        const { getByTestId } = render(<BotHead />);
        fireEvent.load(getByTestId("head-image"));
        expect(getByTestId("grid-container").className).toBe("grid-container visible");
    });
});