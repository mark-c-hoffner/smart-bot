import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';

const matchDataManagerMock = {
    getRandomImageItem: jest.fn(),
    getColorItemFromImage: jest.fn(),
    updateColors: jest.fn(),
    getAllColorOptions: jest.fn()
};
const textDataMock = {
    getWelcomeText: jest.fn(),
    getAnswerIsCorrectText: jest.fn(),
    getColorCorrectionText: jest.fn(),
    getWrongText: jest.fn(),
    getMistakeText: jest.fn(),
    getCorrectionText: jest.fn(),
    getCorrectionMistakeText: jest.fn(),
    getAssertionText: jest.fn(),
    getRankQuoteText: jest.fn()
};

const botHeadMock = jest.fn();
const textAnimationWrapperMock = jest.fn();
const dropdownWrapperMock = jest.fn();

describe('Orchestrator', () => {

    const bootupCompletionHelper = async () => {
        const i = render(<Orchestrator />);
        await act(() => botHeadMock.mock.lastCall[0].bootupCompletionCallback());
        return i;
    }

    let Orchestrator;

    beforeEach(async () => {
        jest.doMock('../../../tools/match-data-manager', () => matchDataManagerMock)
        jest.doMock('../../../tools/text-data', () => textDataMock)
        jest.doMock('../../../tools/rank-getter', () => "mockRank")

        jest.doMock('../BotHead', () => botHeadMock)
        jest.doMock('../TextAnimationWrapper', () => textAnimationWrapperMock)
        jest.doMock('../DropdownWrapper', () => dropdownWrapperMock)

        matchDataManagerMock.getRandomImageItem.mockReturnValueOnce({ id: "id1", source: "firstImageSource", alt: "firstImageAlt" }).mockReturnValue({ id: "id2", source: "secondImageSource", alt: "secondImageAlt" });
        matchDataManagerMock.getColorItemFromImage.mockReturnValue({ name: "mock1", match: "id1" });
        matchDataManagerMock.getAllColorOptions.mockReturnValue('mockAllColorOptions');

        textDataMock.getWelcomeText.mockImplementation((data1) => { return { body: `testWelcomeMessage ${data1}`, buttons: [`welcome button1`] } });
        textDataMock.getAssertionText.mockImplementation((data1) => { return { body: `testAssertionText ${data1}`, buttons: [`assertion button1`, `assertion button2`] } });
        textDataMock.getAnswerIsCorrectText.mockImplementation((data1) => { return { body: `testAnswerIsCorrectText ${data1}`, buttons: [`answerIsCorrect button1`] } });
        textDataMock.getWrongText.mockImplementation(() => { return { body: `testWrongText`, buttons: [] } });
        textDataMock.getCorrectionText.mockImplementation((data1) => { return { body: `testCorrectionText ${data1}`, buttons: [`correction button1`, `correction button2`] } });
        textDataMock.getCorrectionMistakeText.mockImplementation((data1) => { return { body: `testCorrectionMistakeText ${data1}`, buttons: [`correctionMistake button1`, `correctionMistake button2`] } });
        textDataMock.getColorCorrectionText.mockImplementation((data1) => { return { body: `testColorCorrectionText ${data1}`, buttons: [`colorCorrection button1`, `colorCorrection button2`] } });
        textDataMock.getMistakeText.mockImplementation(() => { return { body: `testMistakeText`, buttons: [] } });
        textDataMock.getRankQuoteText.mockImplementation((data1) => { return `rankQuoteText ${data1}` });

        botHeadMock.mockReturnValue(<>botHeadMock</>);
        textAnimationWrapperMock.mockImplementation(({ textSourceArray }) => <>{textSourceArray}</>);
        dropdownWrapperMock.mockReturnValue(<>dropdownWrapperMock</>);

        const obj = await import('./Orchestrator.jsx');
        Orchestrator = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<Orchestrator />);
    })

    it('displays the rank quote', () => {
        const { getByText } = render(<Orchestrator />);
        expect(getByText(/rankQuoteText mockRank/)).toBeTruthy();
    })

    it('displays bothead', () => {
        const { getByText } = render(<Orchestrator />);
        expect(getByText(/botHeadMock/)).toBeTruthy();
    })

    it('hides textAnimationWrapper until startup completion', () => {
        render(<Orchestrator />);
        expect(textAnimationWrapperMock).not.toHaveBeenCalled();
    })

    it('updates isAnimatingMouth from text animation wrapper callbacks', async () => {
        render(<Orchestrator />);
        await act(() => botHeadMock.mock.lastCall[0].bootupCompletionCallback());
        expect(botHeadMock.mock.calls[0][0].isAnimatingMouth).toBe(false);
        act(() => textAnimationWrapperMock.mock.lastCall[0].textStartCallback());
        expect(botHeadMock.mock.lastCall[0].isAnimatingMouth).toBe(true);
        act(() => textAnimationWrapperMock.mock.lastCall[0].textStopCallback());
        expect(botHeadMock.mock.lastCall[0].isAnimatingMouth).toBe(false);
    })

    it('does not display welcome message until boot callback is called', async () => {
        const { queryByText, getByText } = render(<Orchestrator />);
        expect(queryByText(/testWelcomeMessage mockRank/)).toBeFalsy();
        await act(() => botHeadMock.mock.lastCall[0].bootupCompletionCallback());
        expect(getByText(/testWelcomeMessage mockRank/)).toBeTruthy();
    })

    it('displays assertion text after user click', async () => {
        const { getByText } = await bootupCompletionHelper();
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/welcome button1/));
        await waitFor(() => {
            expect(getByText(/testAssertionText mock1/)).toBeTruthy();
        });
    })

    it('displays returned image after user click', async () => {
        const { getByText, getByAltText } = await bootupCompletionHelper();
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/welcome button1/));
        await waitFor(() => {
            expect(getByAltText(`firstImageAlt`).src).toBe(`http://localhost/firstImageSource`);
        });
    })

    it('displays correct text after user click correct', async () => {
        const { getByText } = await bootupCompletionHelper();
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/welcome button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/assertion button2/));
        await waitFor(() => {
            expect(getByText(/testAnswerIsCorrectText mock1/)).toBeTruthy();
        });
    })

    it('calls update colors on correct', async () => {
        const { getByText } = await bootupCompletionHelper();
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/welcome button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/assertion button2/));
        expect(matchDataManagerMock.updateColors.mock.calls[0][0].id).toBe('id1');
        expect(matchDataManagerMock.updateColors.mock.calls[0][1]).toBe('mock1');
    })

    it('displays new returned image on subsequent assertion', async () => {
        const { getByText, getByAltText } = await bootupCompletionHelper();
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/welcome button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/assertion button2/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/answerIsCorrect button1/));
        await waitFor(() => {
            expect(getByAltText(`secondImageAlt`).src).toBe(`http://localhost/secondImageSource`);
        });
    })

    it('displays correct text after user clicks wrong', async () => {
        const { getByText } = await bootupCompletionHelper();
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/welcome button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/assertion button1/));
        await waitFor(() => {
            expect(getByText(/testWrongText/)).toBeTruthy();
        });
    })

    it('displays dropdown after user clicks wrong', async () => {
        const { getByText } = await bootupCompletionHelper();
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/welcome button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/assertion button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        await waitFor(() => {
            expect(getByText(/dropdownWrapperMock/)).toBeTruthy();
        });
    })

    it('displays correction text if dropdown selection is different from given', async () => {
        const { getByText } = await bootupCompletionHelper();
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/welcome button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/assertion button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'colorValue' }, { value: 'dropdownValue' }));
        await waitFor(() => {
            expect(getByText(/testCorrectionText dropdownValue/)).toBeTruthy();
        });
    })

    it('displays correction mistake text if dropdown selection is the same as given', async () => {
        const { getByText } = await bootupCompletionHelper();
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/welcome button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/assertion button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'dropdownValue' }, { value: 'dropdownValue' }));
        await waitFor(() => {
            expect(getByText(/testCorrectionMistakeText dropdownValue/)).toBeTruthy();
        });
    })

    it('displays dropdown and mistake text if user aborts different correction', async () => {
        const { getByText } = await bootupCompletionHelper();
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/welcome button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/assertion button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'colorValue' }, { value: 'dropdownValue' }));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/correction button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        await waitFor(() => {
            expect(getByText(/testMistakeText/)).toBeTruthy();
            expect(getByText(/dropdownWrapperMock/)).toBeTruthy();
        });
    })

    it('displays dropdown and mistake text if user aborts same correction', async () => {
        const { getByText } = await bootupCompletionHelper();
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/welcome button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/assertion button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'dropdownValue' }, { value: 'dropdownValue' }));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/correctionMistake button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        await waitFor(() => {
            expect(getByText(/testMistakeText/)).toBeTruthy();
            expect(getByText(/dropdownWrapperMock/)).toBeTruthy();
        });
    })

    it('displays color correction text with different correction', async () => {
        const { getByText } = await bootupCompletionHelper();
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/welcome button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/assertion button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'colorValue' }, { value: 'updatedColorName' }));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/correction button2/));
        await waitFor(() => {
            expect(getByText(/testColorCorrectionText updatedColorName/)).toBeTruthy();
            expect(matchDataManagerMock.updateColors.mock.calls[0][0].item).toBe('3');
            expect(matchDataManagerMock.updateColors.mock.calls[0][1]).toBe('updatedColorName');
        });
    })

    it('displays color correction text with same correction', async () => {
        const { getByText } = await bootupCompletionHelper();
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/welcome button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/assertion button1/));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'dropdownValue' }, { value: 'dropdownValue' }));
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        fireEvent.click(getByText(/correctionMistake button2/));
        await waitFor(() => {
            expect(getByText(/testAnswerIsCorrectText dropdownValue/)).toBeTruthy();
            expect(matchDataManagerMock.updateColors.mock.calls[0][0].item).toBe('3');
            expect(matchDataManagerMock.updateColors.mock.calls[0][1]).toBe('dropdownValue');
        });
    })

    it('hides buttons until completion callback is called', async () => {
        const { queryByText } = await bootupCompletionHelper();
        expect(queryByText(/welcome button1/)).toBeFalsy();
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        expect(queryByText(/welcome button1/)).toBeTruthy();
    })

    it('updates animation is skippable when completion callback is called', async () => {
        await bootupCompletionHelper();
        expect(textAnimationWrapperMock.mock.lastCall[0].isSkippable).toBe(true);
        act(() => textAnimationWrapperMock.mock.lastCall[0].completionCallback());
        expect(textAnimationWrapperMock.mock.lastCall[0].isSkippable).toBe(false);
    })
})