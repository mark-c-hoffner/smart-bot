import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

const randomMock = jest.fn();
const matchDataMock = [{ name: "mock1", match: "id1" }, { name: "mock3", match: "id3" }, { name: "mock2", match: "none" }];
const imageDataMock = [{ item: "1", id: "id5" }, { item: "2", id: "id3" }, { item: "3", id: "id1" }];

const assertionPromptMock = jest.fn();
const correctResponsePromptMock = jest.fn();
const tellColorPromptMock = jest.fn();

describe('Orchestrator', () => {

    let Orchestrator;

    beforeEach(async () => {
        jest.doMock('../../../tools/random', () => randomMock)
        jest.doMock('../../../tools/matchData', () => matchDataMock)
        jest.doMock('../../../tools/imageData', () => imageDataMock)
        jest.doMock('./AssertionPrompt', () => assertionPromptMock)
        jest.doMock('./CorrectResponsePrompt', () => correctResponsePromptMock)
        jest.doMock('./TellColorPrompt', () => tellColorPromptMock)

        randomMock.mockReturnValue(0);

        const obj = await import('./Orchestrator.jsx');
        Orchestrator = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<Orchestrator />);
    })

    it('calls assertion component after user click', () => {
        const { getByText } = render(<Orchestrator />);
        expect(assertionPromptMock).not.toHaveBeenCalled();
        fireEvent.click(getByText('See what I know?'));
        expect(assertionPromptMock).toHaveBeenCalledTimes(1);
        expect(assertionPromptMock.mock.calls[0][0].pictureItem.item).toBe('3');
        expect(assertionPromptMock.mock.calls[0][0].colorItem.name).toBe('mock1');
    })

    it('calls response prompt on correct', () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('See what I know?'));
        const colorItem = assertionPromptMock.mock.calls[0][0].colorItem;
        const pictureItem = assertionPromptMock.mock.calls[0][0].pictureItem;
        expect(correctResponsePromptMock).not.toHaveBeenCalled();
        act(() => assertionPromptMock.mock.calls[0][0].handleCorrect(pictureItem, colorItem));
        expect(correctResponsePromptMock).toHaveBeenCalledTimes(1);
        expect(correctResponsePromptMock.mock.calls[0][0].pictureItem.item).toBe('3');
        expect(correctResponsePromptMock.mock.calls[0][0].colorItem.name).toBe('mock1');
    })

    it('calls assertion component after user click', () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('See what I know?'));
        const colorItem = assertionPromptMock.mock.calls[0][0].colorItem;
        const pictureItem = assertionPromptMock.mock.calls[0][0].pictureItem;
        act(() => assertionPromptMock.mock.calls[0][0].handleCorrect(pictureItem, colorItem));
        assertionPromptMock.mockReset();
        act(() => correctResponsePromptMock.mock.calls[0][0].getAnAssertion(colorItem));
        expect(assertionPromptMock).toHaveBeenCalledTimes(1);
    })

    it('removes last color from subsequent assertion calls', () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('See what I know?'));
        const colorItem = assertionPromptMock.mock.calls[0][0].colorItem;
        const pictureItem = assertionPromptMock.mock.calls[0][0].pictureItem;
        act(() => assertionPromptMock.mock.calls[0][0].handleCorrect(pictureItem, colorItem));
        assertionPromptMock.mockReset();
        act(() => correctResponsePromptMock.mock.calls[0][0].getAnAssertion(colorItem));
        expect(assertionPromptMock.mock.calls[0][0].pictureItem.item).toBe('2');
        expect(assertionPromptMock.mock.calls[0][0].colorItem.name).toBe('mock3');
    })

    it('updates color when a guess was made', () => {
        const { getByText } = render(<Orchestrator />);
        randomMock.mockReturnValueOnce(2);
        randomMock.mockReturnValueOnce(0);
        fireEvent.click(getByText('See what I know?'));

        const colorItem1 = assertionPromptMock.mock.calls[0][0].colorItem;
        const pictureItem1 = assertionPromptMock.mock.calls[0][0].pictureItem;
        expect(pictureItem1.item).toBe('1');
        expect(colorItem1.name).toBe('mock2');

        act(() => assertionPromptMock.mock.calls[0][0].handleCorrect(pictureItem1, colorItem1));

        randomMock.mockReturnValue(0);
        assertionPromptMock.mockReset();
        act(() => correctResponsePromptMock.mock.calls[0][0].getAnAssertion(colorItem1));

        const colorItem2 = assertionPromptMock.mock.calls[0][0].colorItem;
        randomMock.mockReturnValueOnce(1);
        assertionPromptMock.mockReset();
        act(() => correctResponsePromptMock.mock.calls[0][0].getAnAssertion(colorItem2));

        const colorItem3 = assertionPromptMock.mock.calls[0][0].colorItem;
        const pictureItem3 = assertionPromptMock.mock.calls[0][0].pictureItem;
        expect(pictureItem3.item).toBe('1');
        expect(colorItem3.name).toBe('mock2');
    })
})