import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

const randomMock = jest.fn();
const matchDataMock = [];
const imageDataMock = [];

const textDataMock = {
    getWelcomeText: jest.fn(),
    getAnswerIsCorrectText: jest.fn(),
    getColorCorrectionText: jest.fn()
};

const textAnimationWrapperMock = jest.fn();
const assertionPromptMock = jest.fn();
const correctResponsePromptMock = jest.fn();
const tellColorPromptMock = jest.fn();

describe('Orchestrator', () => {

    let Orchestrator;

    beforeEach(async () => {
        jest.doMock('../../../tools/random', () => randomMock)
        jest.doMock('../../../tools/matchData', () => matchDataMock)
        jest.doMock('../../../tools/imageData', () => imageDataMock)
        jest.doMock('../../../tools/text-data', () => textDataMock)
        jest.doMock('../TextAnimationWrapper', () => textAnimationWrapperMock)
        jest.doMock('./AssertionPrompt', () => assertionPromptMock)
        jest.doMock('./CorrectResponsePrompt', () => correctResponsePromptMock)
        jest.doMock('./TellColorPrompt', () => tellColorPromptMock)

        matchDataMock[0] = { name: "mock2", match: "none" };
        matchDataMock[1] = { name: "mock3", match: "id3" };
        matchDataMock[2] = { name: "mock1", match: "id1" };
        imageDataMock[0] = { item: "3", id: "id1" };
        imageDataMock[1] = { item: "2", id: "id3" };
        imageDataMock[2] = { item: "1", id: "id5" };

        randomMock.mockReturnValue(0);
        textDataMock.getWelcomeText.mockReturnValue('testWelcomeMessage');
        textDataMock.getAnswerIsCorrectText.mockReturnValue('testAnswerIsCorrectMessage');
        textDataMock.getColorCorrectionText.mockReturnValue('testColorCorrectionMessage');
        textAnimationWrapperMock.mockReturnValue(<>textAnimationWrapperMock</>);
        assertionPromptMock.mockReturnValue(<>assertionPromptMock</>);
        correctResponsePromptMock.mockReturnValue(<>correctResponsePromptMock</>);
        tellColorPromptMock.mockReturnValue(<>tellColorPromptMock</>);

        const obj = await import('./Orchestrator.jsx');
        Orchestrator = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<Orchestrator />);
    })

    it('displays welcome text', () => {
        const { getByText } = render(<Orchestrator />);
        expect(textAnimationWrapperMock.mock.calls[0][0].textSourceArray).toBe("testWelcomeMessage");
        expect(getByText('textAnimationWrapperMock')).toBeTruthy();
    })

    it('calls assertion component after user click', () => {
        const { getByText } = render(<Orchestrator />);
        expect(assertionPromptMock).not.toHaveBeenCalled();
        fireEvent.click(getByText('That\'s why I\'m here!'));
        expect(assertionPromptMock).toHaveBeenCalledTimes(1);
        expect(assertionPromptMock.mock.calls[0][0].imageItem.item).toBe('3');
        expect(assertionPromptMock.mock.calls[0][0].colorItem.name).toBe('mock1');
    })

    it('calls response prompt on correct', () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        const colorItem = assertionPromptMock.mock.calls[0][0].colorItem;
        const imageItem = assertionPromptMock.mock.calls[0][0].imageItem;
        expect(correctResponsePromptMock).not.toHaveBeenCalled();
        act(() => assertionPromptMock.mock.calls[0][0].handleCorrect(imageItem, colorItem));
        expect(correctResponsePromptMock).toHaveBeenCalledTimes(1);
        expect(getByText('correctResponsePromptMock')).toBeTruthy();
        expect(correctResponsePromptMock.mock.calls[0][0].imageItem.item).toBe('3');
        expect(correctResponsePromptMock.mock.calls[0][0].colorItem.name).toBe('mock1');
        expect(correctResponsePromptMock.mock.calls[0][0].promptText).toBe('testAnswerIsCorrectMessage');
    })

    it('calls assertion component after user click', () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        const colorItem = assertionPromptMock.mock.calls[0][0].colorItem;
        const imageItem = assertionPromptMock.mock.calls[0][0].imageItem;
        act(() => assertionPromptMock.mock.calls[0][0].handleCorrect(imageItem, colorItem));
        assertionPromptMock.mockClear();
        expect(assertionPromptMock).not.toHaveBeenCalled();
        act(() => correctResponsePromptMock.mock.calls[0][0].getAnAssertion(imageItem));
        expect(assertionPromptMock).toHaveBeenCalledTimes(1);
        expect(getByText('assertionPromptMock')).toBeTruthy();
    })

    it('removes last color from subsequent assertion calls', () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        const colorItem = assertionPromptMock.mock.calls[0][0].colorItem;
        const imageItem = assertionPromptMock.mock.calls[0][0].imageItem;
        act(() => assertionPromptMock.mock.calls[0][0].handleCorrect(imageItem, colorItem));
        assertionPromptMock.mockClear();
        act(() => correctResponsePromptMock.mock.calls[0][0].getAnAssertion(imageItem));
        expect(assertionPromptMock.mock.calls[0][0].imageItem.item).toBe('2');
        expect(assertionPromptMock.mock.calls[0][0].colorItem.name).toBe('mock3');
    })

    it('updates color when a guess was made', () => {
        const { getByText } = render(<Orchestrator />);
        randomMock.mockReturnValueOnce(2);
        randomMock.mockReturnValueOnce(0);
        fireEvent.click(getByText('That\'s why I\'m here!'));

        const colorItem1 = assertionPromptMock.mock.calls[0][0].colorItem;
        const imageItem1 = assertionPromptMock.mock.calls[0][0].imageItem;
        expect(imageItem1.item).toBe('1');
        expect(colorItem1.name).toBe('mock2');

        act(() => assertionPromptMock.mock.calls[0][0].handleCorrect(imageItem1, colorItem1));

        randomMock.mockReturnValue(0);
        assertionPromptMock.mockClear();
        act(() => correctResponsePromptMock.mock.calls[0][0].getAnAssertion(imageItem1));

        const imageItem2 = assertionPromptMock.mock.calls[0][0].imageItem;
        randomMock.mockReturnValueOnce(1);
        assertionPromptMock.mockClear();
        act(() => correctResponsePromptMock.mock.calls[0][0].getAnAssertion(imageItem2));

        const colorItem3 = assertionPromptMock.mock.calls[0][0].colorItem;
        const imageItem3 = assertionPromptMock.mock.calls[0][0].imageItem;
        expect(imageItem3.item).toBe('1');
        expect(colorItem3.name).toBe('mock2');
    })

    it('calls response prompt on wrong', () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        const colorItem = assertionPromptMock.mock.calls[0][0].colorItem;
        const imageItem = assertionPromptMock.mock.calls[0][0].imageItem;
        expect(tellColorPromptMock).not.toHaveBeenCalled();
        act(() => assertionPromptMock.mock.calls[0][0].handleWrong(imageItem, colorItem));
        expect(tellColorPromptMock).toHaveBeenCalledTimes(1);
        expect(getByText('tellColorPromptMock')).toBeTruthy();
        expect(tellColorPromptMock.mock.calls[0][0].imageItem.item).toBe('3');
        expect(tellColorPromptMock.mock.calls[0][0].colorItem.name).toBe('mock1');
        expect(tellColorPromptMock.mock.calls[0][0].colors).toBe(matchDataMock);
    })

    it('calls correctresponseprompt on correction', () => {
        const { getByText } = render(<Orchestrator />);
        randomMock.mockReturnValueOnce(2);
        randomMock.mockReturnValueOnce(0);
        fireEvent.click(getByText('That\'s why I\'m here!'));

        const colorItem1 = assertionPromptMock.mock.calls[0][0].colorItem;
        const imageItem1 = assertionPromptMock.mock.calls[0][0].imageItem;
        expect(imageItem1.item).toBe('1');
        expect(colorItem1.name).toBe('mock2');

        act(() => assertionPromptMock.mock.calls[0][0].handleWrong(imageItem1, colorItem1));

        expect(correctResponsePromptMock).not.toHaveBeenCalled();
        act(() => tellColorPromptMock.mock.calls[0][0].handleColorCorrection(imageItem1, 'mock3'));
        expect(correctResponsePromptMock).toHaveBeenCalledTimes(1);
        expect(correctResponsePromptMock.mock.calls[0][0].imageItem.item).toBe('1');
        expect(correctResponsePromptMock.mock.calls[0][0].colorItem.name).toBe('mock3');
        expect(correctResponsePromptMock.mock.calls[0][0].promptText).toBe('testColorCorrectionMessage');
    })

    it('updates colors on correction', () => {
        const { getByText } = render(<Orchestrator />);
        randomMock.mockReturnValueOnce(2);
        randomMock.mockReturnValueOnce(0);
        fireEvent.click(getByText('That\'s why I\'m here!'));

        const colorItem1 = assertionPromptMock.mock.calls[0][0].colorItem;
        const imageItem1 = assertionPromptMock.mock.calls[0][0].imageItem;
        expect(imageItem1.item).toBe('1');
        expect(colorItem1.name).toBe('mock2');

        act(() => assertionPromptMock.mock.calls[0][0].handleWrong(imageItem1, colorItem1));
        act(() => tellColorPromptMock.mock.calls[0][0].handleColorCorrection(imageItem1, 'mock3'));

        randomMock.mockReturnValue(0);
        assertionPromptMock.mockClear();
        act(() => correctResponsePromptMock.mock.calls[0][0].getAnAssertion(imageItem1));

        const colorItem2 = assertionPromptMock.mock.calls[0][0].colorItem;
        const imageItem2 = assertionPromptMock.mock.calls[0][0].imageItem;
        expect(imageItem2.item).toBe('3');
        expect(colorItem2.name).toBe('mock1');

        act(() => assertionPromptMock.mock.calls[0][0].handleCorrect(imageItem2, colorItem2));

        randomMock.mockReturnValue(1);
        assertionPromptMock.mockClear();

        act(() => correctResponsePromptMock.mock.calls[0][0].getAnAssertion(imageItem2));
        const colorItem3 = assertionPromptMock.mock.calls[0][0].colorItem;
        const imageItem3 = assertionPromptMock.mock.calls[0][0].imageItem;
        expect(imageItem3.item).toBe('1');
        expect(colorItem3.name).toBe('mock3');
    })
})