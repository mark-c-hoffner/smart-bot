import React from 'react';
import { fireEvent, render } from '@testing-library/react';

const botEyesMock = jest.fn();

describe('BotHead', () => {

    let BotHead;

    beforeEach(async () => {
        jest.doMock('./BotEyes', () => botEyesMock)

        botEyesMock.mockReturnValue(<>botEyesMock</>);

        const obj = await import('./BotHead.jsx');
        BotHead = obj.default;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        render(<BotHead />);
    });

    it('displays botEyes', () => {
        const { getByText } = render(<BotHead />);
        expect(getByText(/botEyesMock/)).toBeTruthy();
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

    it('starts the grid-container dimensions at 0', () => {
        const { getByTestId } = render(<BotHead />);
        const syleObj = getByTestId("grid-container").style;
        expect(syleObj.position).toBe("relative");
        expect(syleObj.maxHeight).toBe("0");
        expect(syleObj.maxWidth).toBe("0");
    });

    it('updates the grid-container dimensions', () => {
        const { getByTestId } = render(<BotHead />);
        fireEvent.load(getByTestId("head-image"), { target: { height: 400, width: 200 } });
        const syleObj = getByTestId("grid-container").style;
        expect(syleObj.position).toBe("relative");
        expect(syleObj.maxHeight).toBe("400px");
        expect(syleObj.maxWidth).toBe("200px");
    });
});