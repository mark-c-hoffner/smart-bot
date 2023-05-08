import React from 'react';
import { act, render } from '@testing-library/react';

jest.useFakeTimers();

const doScrollToBottomMock = jest.fn();
const sequenceFunctionMock = jest.fn();

describe('CustomTypeAnimation', () => {

    let CustomTypeAnimation;

    beforeEach(async () => {
        const obj = await import('./CustomTypeAnimation.jsx');
        CustomTypeAnimation = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    afterAll(() => {
        jest.useRealTimers();
    });

    it('renders without crashing', () => {
        render(<CustomTypeAnimation sequence={[]} doScrollToBottom={doScrollToBottomMock} shouldSkip={true} />);
    })

    it('should render the first part of the first element in the sequence', () => {
        const { getByText } = render(<CustomTypeAnimation sequence={["1234"]} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        expect(getByText("1")).toBeTruthy();
    })

    it('should render the next part of the first element in the sequence after the given delay', () => {
        const { getByText } = render(<CustomTypeAnimation sequence={["1234"]} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        expect(getByText("1")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("12")).toBeTruthy();
    })

    it('should call doScrollToBottom whenever displayed text changes', () => {
        render(<CustomTypeAnimation sequence={["1234"]} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        expect(doScrollToBottomMock).toHaveBeenCalledTimes(2);
        act(() => jest.advanceTimersByTime(1));
        expect(doScrollToBottomMock).toHaveBeenCalledTimes(3);
        act(() => jest.advanceTimersByTime(1));
        expect(doScrollToBottomMock).toHaveBeenCalledTimes(4);
        act(() => jest.advanceTimersByTime(1));
        expect(doScrollToBottomMock).toHaveBeenCalledTimes(5);
        act(() => jest.advanceTimersByTime(1));
        expect(doScrollToBottomMock).toHaveBeenCalledTimes(5);
    })

    it('should render the entire sequence when should skip is true', async () => {
        const sequence = ["1234", "4321", "abcd", "dcba"];
        const { getByText, rerender } = render(<CustomTypeAnimation sequence={sequence} shouldSkip={false} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        expect(getByText("1")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("12")).toBeTruthy();
        rerender(<CustomTypeAnimation sequence={sequence} shouldSkip={true} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        expect(getByText("12344321abcddcba")).toBeTruthy();
    })

    it('should stop running timeout on skip', async () => {
        const sequence = ["1234", "4321", "abcd", "dcba"];
        const { getByText, rerender } = render(<CustomTypeAnimation sequence={sequence} shouldSkip={false} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        expect(getByText("1")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("12")).toBeTruthy();
        rerender(<CustomTypeAnimation sequence={sequence} shouldSkip={true} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        expect(getByText("12344321abcddcba")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("12344321abcddcba")).toBeTruthy();
        rerender(<CustomTypeAnimation sequence={["zyxw", "9875", "vuts"]} shouldSkip={false} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        act(() => jest.advanceTimersByTime(1));
        act(() => jest.advanceTimersByTime(1));
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("zyxw")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        act(() => jest.advanceTimersByTime(1));
        act(() => jest.advanceTimersByTime(1));
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("zyxw9875")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        act(() => jest.advanceTimersByTime(1));
        act(() => jest.advanceTimersByTime(1));
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("zyxw9875vuts")).toBeTruthy();
    })

    it('should wait when sequence element is a number', async () => {
        const sequence = ["1234", 100, "abcd"];
        const { getByText } = render(<CustomTypeAnimation sequence={sequence} shouldSkip={false} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        expect(getByText("1")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        act(() => jest.advanceTimersByTime(1));
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("1234")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("1234")).toBeTruthy();
        act(() => jest.advanceTimersByTime(100));
        expect(getByText("1234a")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("1234ab")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("1234abc")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("1234abcd")).toBeTruthy();
    })

    it('should clear running wait when should skip is true', async () => {
        const sequence = ["1234", 100, "4321", "abcd", "dcba"];
        const { getByText, rerender } = render(<CustomTypeAnimation sequence={sequence} shouldSkip={false} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        expect(getByText("1")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        act(() => jest.advanceTimersByTime(1));
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("1234")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("1234")).toBeTruthy();
        act(() => jest.advanceTimersByTime(50));
        rerender(<CustomTypeAnimation sequence={sequence} shouldSkip={true} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        expect(getByText("12344321abcddcba")).toBeTruthy();
    })

    it('should call the function when sequence element is a function', () => {
        render(<CustomTypeAnimation sequence={[sequenceFunctionMock]} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        expect(sequenceFunctionMock).toHaveBeenCalledTimes(1);
    })

    it('should not call functions when skip is true', async () => {
        const sequence = ["1234", 100, sequenceFunctionMock, "4321", "abcd", "dcba"];
        const { getByText, rerender } = render(<CustomTypeAnimation sequence={sequence} shouldSkip={false} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        expect(getByText("1")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        act(() => jest.advanceTimersByTime(1));
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("1234")).toBeTruthy();
        act(() => jest.advanceTimersByTime(1));
        expect(getByText("1234")).toBeTruthy();
        act(() => jest.advanceTimersByTime(50));
        rerender(<CustomTypeAnimation sequence={sequence} shouldSkip={true} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        expect(sequenceFunctionMock).not.toHaveBeenCalled();
        expect(getByText("12344321abcddcba")).toBeTruthy();
        act(() => jest.advanceTimersByTime(50));
        expect(sequenceFunctionMock).not.toHaveBeenCalled();
    })

    it('should move to next element when sequence element is unmatched', () => {
        render(<CustomTypeAnimation sequence={[null, sequenceFunctionMock]} delayBetweenTyping={1} doScrollToBottom={doScrollToBottomMock} />);
        expect(sequenceFunctionMock).toHaveBeenCalledTimes(1);
    })
})