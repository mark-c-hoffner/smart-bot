import React from 'react';
import { fireEvent, render } from '@testing-library/react';

const typeAnimationMock = jest.fn();
const completionCallbackMock = jest.fn();
const startCallbackMock = jest.fn();
const stopCallbackMock = jest.fn();

describe('TextAnimationWrapper', () => {

    let TextAnimationWrapper;

    beforeEach(async () => {
        jest.doMock('../CustomTypeAnimation', () => typeAnimationMock)
        typeAnimationMock.mockReturnValue('typeAnimationMock');

        const obj = await import('./TextAnimationWrapper.jsx');
        TextAnimationWrapper = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<TextAnimationWrapper textSourceArray={[]} />);
    })

    it('calls the type animation component', () => {
        const { getByText } = render(<TextAnimationWrapper textSourceArray={['testWelcomeMessage']} />);
        expect(typeAnimationMock.mock.calls[0][0].sequence).toBe(null);
        expect(typeAnimationMock.mock.calls[0][0].shouldSkip).toBe(false);
        expect(typeAnimationMock.mock.calls[0][0].delayBetweenTyping).toBe(40);
        expect(typeAnimationMock.mock.calls[1][0].sequence[1]).toBe("testWelcomeMessage\n");
        expect(typeAnimationMock.mock.calls[1][0].shouldSkip).toBe(false);
        expect(getByText('typeAnimationMock')).toBeTruthy();
    })

    it('preps the text array with delays and merges', () => {
        render(<TextAnimationWrapper textSourceArray={['1', '2', '3']} />);
        expect(typeAnimationMock.mock.lastCall[0].sequence[1]).toBe("1\n");
        expect(typeAnimationMock.mock.lastCall[0].sequence[3]).toBe(500);
        expect(typeAnimationMock.mock.lastCall[0].sequence[5]).toBe("2\n");
        expect(typeAnimationMock.mock.lastCall[0].sequence[7]).toBe(500);
        expect(typeAnimationMock.mock.lastCall[0].sequence[9]).toBe("3\n");
        expect(typeAnimationMock.mock.lastCall[0].sequence[11]).toBe(500);
    })

    it('preps the text array with start and stop callbacks', () => {
        render(<TextAnimationWrapper textSourceArray={['1', '2', '3']} textStartCallback={startCallbackMock} textStopCallback={stopCallbackMock} />);
        expect(startCallbackMock).not.toHaveBeenCalled();
        typeAnimationMock.mock.lastCall[0].sequence[0]();
        typeAnimationMock.mock.lastCall[0].sequence[4]();
        typeAnimationMock.mock.lastCall[0].sequence[8]();
        expect(startCallbackMock).toHaveBeenCalledTimes(3);
        expect(stopCallbackMock).not.toHaveBeenCalled();
        typeAnimationMock.mock.lastCall[0].sequence[2]();
        typeAnimationMock.mock.lastCall[0].sequence[6]();
        typeAnimationMock.mock.lastCall[0].sequence[10]();
        expect(stopCallbackMock).toHaveBeenCalledTimes(3);
    })

    it('skips start callback if text is empty, smile, or double smile', () => {
        render(<TextAnimationWrapper textSourceArray={['', ':)', ':):)']} textStartCallback={startCallbackMock} textStopCallback={stopCallbackMock} />);
        expect(typeAnimationMock.mock.lastCall[0].sequence[0]).toBe("\n");
        typeAnimationMock.mock.lastCall[0].sequence[1]();
        expect(typeAnimationMock.mock.lastCall[0].sequence[2]).toBe(500);
        expect(typeAnimationMock.mock.lastCall[0].sequence[3]).toBe(":)\n");
        typeAnimationMock.mock.lastCall[0].sequence[4]();
        expect(typeAnimationMock.mock.lastCall[0].sequence[5]).toBe(500);
        expect(typeAnimationMock.mock.lastCall[0].sequence[6]).toBe(":):)\n");
        typeAnimationMock.mock.lastCall[0].sequence[7]();
        expect(typeAnimationMock.mock.lastCall[0].sequence[8]).toBe(500);
        expect(startCallbackMock).not.toHaveBeenCalled();
        expect(stopCallbackMock).toHaveBeenCalledTimes(3);
    })

    it('rerenders new type animation component on prop change', () => {
        const { rerender } = render(<TextAnimationWrapper textSourceArray={['1', '2', '3']} />);
        typeAnimationMock.mockClear();
        rerender(<TextAnimationWrapper textSourceArray={['4', '5', '6']} />);
        expect(typeAnimationMock.mock.lastCall[0].sequence[1]).toBe("4\n");
        expect(typeAnimationMock.mock.lastCall[0].sequence[3]).toBe(500);
        expect(typeAnimationMock.mock.lastCall[0].sequence[5]).toBe("5\n");
        expect(typeAnimationMock.mock.lastCall[0].sequence[7]).toBe(500);
        expect(typeAnimationMock.mock.lastCall[0].sequence[9]).toBe("6\n");
        expect(typeAnimationMock.mock.lastCall[0].sequence[11]).toBe(500);
    })

    it('passes the completion callback to the type animation component', () => {
        render(<TextAnimationWrapper textSourceArray={['1', '2', '3']} completionCallback={completionCallbackMock} />);
        expect(completionCallbackMock).not.toHaveBeenCalled();
        typeAnimationMock.mock.lastCall[0].sequence[12]();
        expect(completionCallbackMock).toHaveBeenCalledTimes(1);
    })

    it('sets cursor to default', () => {
        const { getByTestId } = render(<TextAnimationWrapper isSkippable={false}  textSourceArray={['1', '2', '3']} />);
        expect(getByTestId("text-animation-wrapper").style.cursor).toBe("default");
    })

    it('sets cursor to progress', () => {
        const { getByTestId } = render(<TextAnimationWrapper isSkippable={true} textSourceArray={['1', '2', '3']} />);
        expect(getByTestId("text-animation-wrapper").style.cursor).toBe("progress");
    })

    it('does nothing on click if not skippable', () => {
        const { getByTestId } = render(<TextAnimationWrapper isSkippable={false} textStopCallback={stopCallbackMock} completionCallback={completionCallbackMock} textSourceArray={['1', '2', '3']} />);
        fireEvent.click(getByTestId("text-animation-wrapper"));
        expect(stopCallbackMock).not.toHaveBeenCalled();
        expect(completionCallbackMock).not.toHaveBeenCalled();
    })

    it('calls text stop callback and completion callback on skip', () => {
        const { getByTestId } = render(<TextAnimationWrapper isSkippable={true} textStopCallback={stopCallbackMock} completionCallback={completionCallbackMock} textSourceArray={['1', '2', '3']} />);
        fireEvent.click(getByTestId("text-animation-wrapper"));
        expect(stopCallbackMock).toHaveBeenCalledTimes(1);
        expect(completionCallbackMock).toHaveBeenCalledTimes(1);
    })

    it('updates text animation component on skip', () => {
        const { getByTestId } = render(<TextAnimationWrapper isSkippable={true} textStopCallback={stopCallbackMock} completionCallback={completionCallbackMock} textSourceArray={['1', '2', '3']} />);
        fireEvent.click(getByTestId("text-animation-wrapper"));
        expect(typeAnimationMock.mock.lastCall[0].shouldSkip).toBe(true);
    })
})