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
    getAssertionText: jest.fn()
};

const textAnimationWrapperMock = jest.fn();
const dropdownWrapperMock = jest.fn();

describe('Orchestrator', () => {

    let Orchestrator;

    beforeEach(async () => {
        jest.doMock('../../../tools/matchDataManager', () => matchDataManagerMock)
        jest.doMock('../../../tools/text-data', () => textDataMock)
        jest.doMock('../TextAnimationWrapper', () => textAnimationWrapperMock)
        jest.doMock('../DropdownWrapper', () => dropdownWrapperMock)

        matchDataManagerMock.getRandomImageItem.mockReturnValue({ item: "3", id: "id1" });
        matchDataManagerMock.getColorItemFromImage.mockReturnValue({ name: "mock1", match: "id1" });
        matchDataManagerMock.updateColors.mockReturnValue({ name: 'updatedColorName' });
        matchDataManagerMock.getAllColorOptions.mockReturnValue('mockAllColorOptions');

        textDataMock.getWelcomeText.mockImplementation(() => `testWelcomeMessage`);
        textDataMock.getAssertionText.mockImplementation((data1, data2) => `testAssertionText ${data1} ${data2}`);
        textDataMock.getAnswerIsCorrectText.mockImplementation((data1, data2) => `testAnswerIsCorrectText ${data1} ${data2}`);
        textDataMock.getWrongText.mockImplementation((data1) => `testWrongText ${data1}`);
        textDataMock.getCorrectionText.mockImplementation((data1, data2) => `testCorrectionText ${data1} ${data2}`);
        textDataMock.getCorrectionMistakeText.mockImplementation((data1, data2) => `testCorrectionMistakeText ${data1} ${data2}`);
        textDataMock.getColorCorrectionText.mockImplementation((data1, data2) => `testColorCorrectionText ${data1} ${data2}`);
        textDataMock.getMistakeText.mockImplementation((data1) => `testMistakeText ${data1}`);

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

    it('displays welcome text', () => {
        const { getByText } = render(<Orchestrator />);
        expect(getByText('testWelcomeMessage')).toBeTruthy();
    })

    it('displays assertion text after user click', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        await waitFor(() => {
            expect(getByText(`testAssertionText 3 mock1`)).toBeTruthy();
        });
    })

    it('displays correct text after user click correct', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        fireEvent.click(getByText('That\'s right!'));
        await waitFor(() => {
            expect(getByText(`testAnswerIsCorrectText 3 mock1`)).toBeTruthy();
        });
    })

    it('calls update colors on correct', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        fireEvent.click(getByText('That\'s right!'));
        expect(matchDataManagerMock.updateColors.mock.calls[0][0].id).toBe('id1');
        expect(matchDataManagerMock.updateColors.mock.calls[0][1]).toBe('mock1');
    })

    it('displays correct text after user clicks wrong', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        fireEvent.click(getByText('Wrong!'));
        await waitFor(() => {
            expect(getByText(/testWrongText 3/)).toBeTruthy();
        });
    })

    it('displays dropdown after user clicks wrong', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        fireEvent.click(getByText('Wrong!'));
        await waitFor(() => {
            expect(getByText(/dropdownWrapperMock/)).toBeTruthy();
        });
    })

    it('displays correction text if dropdown selection is different from given', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        fireEvent.click(getByText('Wrong!'));
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'colorValue' }, { value: 'dropdownValue' }));
        await waitFor(() => {
            expect(getByText(/testCorrectionText 3 dropdownValue/)).toBeTruthy();
        });
    })

    it('displays correction mistake text if dropdown selection is the same as given', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        fireEvent.click(getByText('Wrong!'));
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'dropdownValue' }, { value: 'dropdownValue' }));
        await waitFor(() => {
            expect(getByText(/testCorrectionMistakeText 3 dropdownValue/)).toBeTruthy();
        });
    })

    it('displays dropdown and mistake text if user aborts different correction', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        fireEvent.click(getByText('Wrong!'));
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'colorValue' }, { value: 'dropdownValue' }));
        fireEvent.click(getByText('No, sorry! Let me try again.'));
        await waitFor(() => {
            expect(getByText(/testMistakeText 3/)).toBeTruthy();
            expect(getByText(/dropdownWrapperMock/)).toBeTruthy();
        });
    })

    it('displays dropdown and mistake text if user aborts same correction', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        fireEvent.click(getByText('Wrong!'));
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'dropdownValue' }, { value: 'dropdownValue' }));
        fireEvent.click(getByText('My mistake, smart-bot. Let me try again.'));
        await waitFor(() => {
            expect(getByText(/testMistakeText 3/)).toBeTruthy();
            expect(getByText(/dropdownWrapperMock/)).toBeTruthy();
        });
    })

    it('displays color correction text', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        fireEvent.click(getByText('Wrong!'));
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'colorValue' }, { value: 'dropdownValue' }));
        fireEvent.click(getByText('That\'s right!'));
        await waitFor(() => {
            expect(getByText(/testColorCorrectionText 3 updatedColorName/)).toBeTruthy();
            expect(matchDataManagerMock.updateColors.mock.calls[0][0].item).toBe('3');
            expect(matchDataManagerMock.updateColors.mock.calls[0][1]).toBe('dropdownValue');
        });
    })

    it('displays color correction text', async () => {
        const { getByText } = render(<Orchestrator />);
        fireEvent.click(getByText('That\'s why I\'m here!'));
        fireEvent.click(getByText('Wrong!'));
        act(() => dropdownWrapperMock.mock.calls[0][0].handleDropdownChange({ item: '3' }, { name: 'dropdownValue' }, { value: 'dropdownValue' }));
        fireEvent.click(getByText('I\'m so sorry, smart-bot. You were right the first time.'));
        await waitFor(() => {
            expect(getByText(/testAnswerIsCorrectText 3 dropdownValue/)).toBeTruthy();
            expect(matchDataManagerMock.updateColors.mock.calls[0][0].item).toBe('3');
            expect(matchDataManagerMock.updateColors.mock.calls[0][1]).toBe('dropdownValue');
        });
    })
})