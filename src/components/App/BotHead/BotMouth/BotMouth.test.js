import React from 'react';
import { act, render } from '@testing-library/react';

jest.useFakeTimers();

const randomMock = jest.fn();
const botImageDataMock = {
    getSpeechArray: jest.fn(),
    getMouthOpen: jest.fn()
};
const speechArrayMock = [
    'mouthOpenMock',
    'speech2',
    'speech3',
    'speech4'
];

describe('BotMouth', () => {

    let BotMouth;

    const setRandomReturnToStandard = () => {
        randomMock.mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(1).mockReturnValueOnce(0).mockReturnValueOnce(2).mockReturnValueOnce(0).mockReturnValue(0);
    };

    beforeEach(async () => {
        jest.doMock("../../../../tools/random", () => randomMock)
        jest.doMock("../../../../tools/bot-image-data", () => botImageDataMock)

        botImageDataMock.getSpeechArray.mockReturnValue(speechArrayMock);
        botImageDataMock.getMouthOpen.mockReturnValue('mouthOpenMock');

        const obj = await import('./BotMouth.jsx');
        BotMouth = obj.default;
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    afterAll(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('renders without crashing', () => {
        render(<BotMouth />);
    });

    it('begins with mouth open', () => {
        const { getByTestId } = render(<BotMouth isAnimatingMouth={false} />);
        expect(getByTestId("mouth").src).toBe("http://localhost/mouthOpenMock");
    });

    it('moves randomly through speech array when animating', () => {
        const { getByTestId, rerender } = render(<BotMouth isAnimatingMouth={false} />);
        expect(getByTestId("mouth").src).toBe("http://localhost/mouthOpenMock");

        setRandomReturnToStandard();
        rerender(<BotMouth isAnimatingMouth={true} />);
        act(() => jest.advanceTimersByTime(175));
        expect(getByTestId("mouth").src).toBe("http://localhost/speech2");
        act(() => jest.advanceTimersByTime(175));
        expect(getByTestId("mouth").src).toBe("http://localhost/speech3");
        act(() => jest.advanceTimersByTime(175));
        expect(getByTestId("mouth").src).toBe("http://localhost/speech4");
        act(() => jest.advanceTimersByTime(175));
        expect(getByTestId("mouth").src).toBe("http://localhost/mouthOpenMock");
    });

    it('stops animating on prop change', () => {
        const { getByTestId, rerender } = render(<BotMouth isAnimatingMouth={false} />);
        expect(getByTestId("mouth").src).toBe("http://localhost/mouthOpenMock");

        setRandomReturnToStandard();
        rerender(<BotMouth isAnimatingMouth={true} />);
        act(() => jest.advanceTimersByTime(175));
        expect(getByTestId("mouth").src).toBe("http://localhost/speech2");
        act(() => jest.advanceTimersByTime(175));
        expect(getByTestId("mouth").src).toBe("http://localhost/speech3");
        act(() => jest.advanceTimersByTime(175));
        expect(getByTestId("mouth").src).toBe("http://localhost/speech4");
        rerender(<BotMouth isAnimatingMouth={false} />);
        act(() => jest.advanceTimersByTime(175));
        expect(getByTestId("mouth").src).toBe("http://localhost/speech4");
    });

    it('includes random offset in animation time', () => {
        const { getByTestId, rerender } = render(<BotMouth isAnimatingMouth={false} />);
        expect(getByTestId("mouth").src).toBe("http://localhost/mouthOpenMock");

        randomMock.mockReturnValueOnce(0).mockReturnValueOnce(200).mockReturnValueOnce(0).mockReturnValue(0);

        rerender(<BotMouth isAnimatingMouth={true} />);
        act(() => jest.advanceTimersByTime(175));
        expect(getByTestId("mouth").src).toBe("http://localhost/speech2");
        act(() => jest.advanceTimersByTime(175));
        expect(getByTestId("mouth").src).toBe("http://localhost/speech2");
        act(() => jest.advanceTimersByTime(200));
        expect(getByTestId("mouth").src).toBe("http://localhost/mouthOpenMock");
    });
});