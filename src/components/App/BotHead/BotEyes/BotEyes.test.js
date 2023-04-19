import React from 'react';
import { act, render } from '@testing-library/react';

jest.useFakeTimers();

const randomMock = jest.fn();
const botImageDataMock = {
    getLookAroundArray: jest.fn(),
    getOpen: jest.fn(),
    getClosed: jest.fn()
};
const lookAroundArrayMock = [
    { left: 'leftMock1', right: 'rightMock1' },
    { left: 'leftMock2', right: 'rightMock2' },
];

describe('BotEyes', () => {

    let BotEyes;

    beforeEach(async () => {
        jest.doMock("../../../../tools/random", () => randomMock)
        jest.doMock("../../../../tools/bot-image-data", () => botImageDataMock)

        randomMock.mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValue(0);
        botImageDataMock.getLookAroundArray.mockReturnValue(lookAroundArrayMock);
        botImageDataMock.getOpen.mockReturnValue({ left: 'leftOpenMock', right: 'rightOpenMock' });
        botImageDataMock.getClosed.mockReturnValue({ left: 'leftClosedMock', right: 'rightClosedMock' });

        const obj = await import('./BotEyes.jsx');
        BotEyes = obj.default;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('renders without crashing', () => {
        render(<BotEyes />);
    });

    it('begins with closed eyes', () => {
        const { getByTestId } = render(<BotEyes />);
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftClosedMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightClosedMock");
    });

    it('opens eyes after startup delay and blink clear', () => {
        const { getByTestId } = render(<BotEyes />);
        act(() => jest.advanceTimersByTime(1500 + (288 / 3)));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftOpenMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightOpenMock");
    });

    it('blinks 4 times at startup', () => {
        const { getByTestId } = render(<BotEyes />);
        act(() => jest.advanceTimersByTime(1500 + (288 / 3)));
        
        act(() => jest.advanceTimersByTime(288 / 3));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftClosedMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightClosedMock");
        act(() => jest.advanceTimersByTime(288 / 3));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftOpenMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightOpenMock");

        act(() => jest.advanceTimersByTime(288 / 3));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftClosedMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightClosedMock");
        act(() => jest.advanceTimersByTime(288 / 3));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftOpenMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightOpenMock");

        act(() => jest.advanceTimersByTime(288 / 3));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftClosedMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightClosedMock");
        act(() => jest.advanceTimersByTime(288 / 3));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftOpenMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightOpenMock");

        act(() => jest.advanceTimersByTime(288 / 3));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftClosedMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightClosedMock");
        act(() => jest.advanceTimersByTime(288 / 3));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftOpenMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightOpenMock");

        act(() => jest.advanceTimersByTime(288 / 3));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftOpenMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightOpenMock");
    });

    it('looks around after animation delay and startup delay and zero offset', () => {
        const { getByTestId } = render(<BotEyes />);
        act(() => jest.advanceTimersByTime(3000 + 1500));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftMock1");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightMock1");
    });

    it('blinks and returns to looking around', () => {
        const { getByTestId } = render(<BotEyes />);
        act(() => jest.advanceTimersByTime(1500 + (3000 * 2)));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftClosedMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightClosedMock");
        act(() => jest.advanceTimersByTime(288));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftMock1");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightMock1");
    });

    it('looks other way, blinks and returns to looking other way', () => {
        const { getByTestId } = render(<BotEyes />);
        act(() => jest.advanceTimersByTime(1500 + (3000 * 3)));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftMock2");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightMock2");
        act(() => jest.advanceTimersByTime(3000));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftClosedMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightClosedMock");
        act(() => jest.advanceTimersByTime(288));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftMock2");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightMock2");
    });
});