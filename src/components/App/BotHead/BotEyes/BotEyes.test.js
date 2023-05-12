import React from 'react';
import { act, render } from '@testing-library/react';

jest.useFakeTimers();

const bootupCompletionCallbackMock = jest.fn();

const randomMock = jest.fn();
const botImageDataMock = {
    getLookAroundArray: jest.fn(),
    getOpen: jest.fn(),
    getClosed: jest.fn()
};
const lookAroundArrayMock = [
    { left: 'leftMock1', right: 'rightMock1' },
    { left: 'leftMock2', right: 'rightMock2' },
    { left: 'leftMock3', right: 'rightMock3' },
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
        const { getByTestId } = render(<BotEyes bootupCompletionCallback={bootupCompletionCallbackMock} />);
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftClosedMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightClosedMock");
    });

    it('opens eyes after startup delay and blink clear', () => {
        const { getByTestId } = render(<BotEyes bootupCompletionCallback={bootupCompletionCallbackMock} />);
        act(() => jest.advanceTimersByTime(1500 + (288 / 3)));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftOpenMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightOpenMock");
    });

    it('blinks 4 times at startup then looks left and right then straight', () => {
        const { getByTestId } = render(<BotEyes bootupCompletionCallback={bootupCompletionCallbackMock} />);
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

        act(() => jest.advanceTimersByTime(2400 / 3));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftMock3");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightMock3");

        act(() => jest.advanceTimersByTime(2400 / 3));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftMock2");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightMock2");

        act(() => jest.advanceTimersByTime(2400 / 3));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftMock1");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightMock1");
    });

    it('looks around after animation delay and startup delay and zero offset', () => {
        const { getByTestId } = render(<BotEyes bootupCompletionCallback={bootupCompletionCallbackMock} />);
        act(() => jest.advanceTimersByTime(3000 + 1500 + 2400));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftMock2");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightMock2");
    });

    it('blinks and returns to looking around', () => {
        const { getByTestId } = render(<BotEyes bootupCompletionCallback={bootupCompletionCallbackMock} />);
        act(() => jest.advanceTimersByTime(1500 + (3000 * 2) + 2400));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftClosedMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightClosedMock");
        act(() => jest.advanceTimersByTime(288));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftMock2");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightMock2");
    });

    it('looks other way, blinks and returns to looking other way', () => {
        const { getByTestId } = render(<BotEyes bootupCompletionCallback={bootupCompletionCallbackMock} />);
        act(() => jest.advanceTimersByTime(1500 + (3000 * 3) + 2400));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftMock1");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightMock1");
        act(() => jest.advanceTimersByTime(3000));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftClosedMock");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightClosedMock");
        act(() => jest.advanceTimersByTime(288));
        expect(getByTestId("left-eye").src).toBe("http://localhost/leftMock1");
        expect(getByTestId("right-eye").src).toBe("http://localhost/rightMock1");
    });
});