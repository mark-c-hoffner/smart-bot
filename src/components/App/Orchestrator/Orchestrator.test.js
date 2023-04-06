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

const textAnimationWrapperMock = jest.fn();
const dropdownWrapperMock = jest.fn();

describe('Orchestrator', () => {

    let Orchestrator;

    beforeEach(async () => {
        jest.doMock('../../../tools/matchDataManager', () => matchDataManagerMock)
        jest.doMock('../../../tools/text-data', () => textDataMock)
        jest.doMock('../../../tools/rank-getter', () => "mockRank")

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
        expect(getByText('rankQuoteText mockRank')).toBeTruthy();
    })

    it('displays welcome text', () => {
        const { getByText } = render(<Orchestrator />);
        expect(getByText('testWelcomeMessage mockRank')).toBeTruthy();
    })

    it('displays assertion text after user click', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('welcome button1'));
        await waitFor(() => {
            expect(getByText(`testAssertionText mock1`)).toBeTruthy();
        });
    })

    it('displays returned image after user click', async () => {
        const { getByText, getByAltText } = render(<Orchestrator />);
        fireEvent.click(getByText('welcome button1'));
        await waitFor(() => {
            expect(getByAltText(`firstImageAlt`).src).toBe(`http://localhost/firstImageSource`);
        });
    })

    it('displays correct text after user click correct', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('welcome button1'));
        fireEvent.click(getByText('assertion button2'));
        await waitFor(() => {
            expect(getByText(`testAnswerIsCorrectText mock1`)).toBeTruthy();
        });
    })

    it('calls update colors on correct', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('welcome button1'));
        fireEvent.click(getByText('assertion button2'));
        expect(matchDataManagerMock.updateColors.mock.calls[0][0].id).toBe('id1');
        expect(matchDataManagerMock.updateColors.mock.calls[0][1]).toBe('mock1');
    })

    it('displays new returned image on subsequent assertion', async () => {
        const { getByText, getByAltText } = render(<Orchestrator />);
        fireEvent.click(getByText('welcome button1'));
        fireEvent.click(getByText('assertion button2'));
        fireEvent.click(getByText('answerIsCorrect button1'));
        await waitFor(() => {
            expect(getByAltText(`secondImageAlt`).src).toBe(`http://localhost/secondImageSource`);
        });
    })

    it('displays correct text after user clicks wrong', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('welcome button1'));
        fireEvent.click(getByText('assertion button1'));
        await waitFor(() => {
            expect(getByText(/testWrongText/)).toBeTruthy();
        });
    })

    it('displays dropdown after user clicks wrong', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('welcome button1'));
        fireEvent.click(getByText('assertion button1'));
        await waitFor(() => {
            expect(getByText(/dropdownWrapperMock/)).toBeTruthy();
        });
    })

    it('displays correction text if dropdown selection is different from given', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('welcome button1'));
        fireEvent.click(getByText('assertion button1'));
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'colorValue' }, { value: 'dropdownValue' }));
        await waitFor(() => {
            expect(getByText(/testCorrectionText dropdownValue/)).toBeTruthy();
        });
    })

    it('displays correction mistake text if dropdown selection is the same as given', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('welcome button1'));
        fireEvent.click(getByText('assertion button1'));
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'dropdownValue' }, { value: 'dropdownValue' }));
        await waitFor(() => {
            expect(getByText(/testCorrectionMistakeText dropdownValue/)).toBeTruthy();
        });
    })

    it('displays dropdown and mistake text if user aborts different correction', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('welcome button1'));
        fireEvent.click(getByText('assertion button1'));
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'colorValue' }, { value: 'dropdownValue' }));
        fireEvent.click(getByText('correction button1'));
        await waitFor(() => {
            expect(getByText(/testMistakeText/)).toBeTruthy();
            expect(getByText(/dropdownWrapperMock/)).toBeTruthy();
        });
    })

    it('displays dropdown and mistake text if user aborts same correction', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('welcome button1'));
        fireEvent.click(getByText('assertion button1'));
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'dropdownValue' }, { value: 'dropdownValue' }));
        fireEvent.click(getByText('correctionMistake button1'));
        await waitFor(() => {
            expect(getByText(/testMistakeText/)).toBeTruthy();
            expect(getByText(/dropdownWrapperMock/)).toBeTruthy();
        });
    })

    it('displays color correction text with different correction', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('welcome button1'));
        fireEvent.click(getByText('assertion button1'));
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'colorValue' }, { value: 'updatedColorName' }));
        fireEvent.click(getByText('correction button2'));
        await waitFor(() => {
            expect(getByText(/testColorCorrectionText updatedColorName/)).toBeTruthy();
            expect(matchDataManagerMock.updateColors.mock.calls[0][0].item).toBe('3');
            expect(matchDataManagerMock.updateColors.mock.calls[0][1]).toBe('updatedColorName');
        });
    })

    it('displays color correction text with same correction', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('welcome button1'));
        fireEvent.click(getByText('assertion button1'));
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'dropdownValue' }, { value: 'dropdownValue' }));
        fireEvent.click(getByText('correctionMistake button2'));
        await waitFor(() => {
            expect(getByText(/testAnswerIsCorrectText dropdownValue/)).toBeTruthy();
            expect(matchDataManagerMock.updateColors.mock.calls[0][0].item).toBe('3');
            expect(matchDataManagerMock.updateColors.mock.calls[0][1]).toBe('dropdownValue');
        });
    })
})