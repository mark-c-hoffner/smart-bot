import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

const textDataMock = {
    getWrongText: jest.fn(),
    getMistakeText: jest.fn(),
    getCorrectionText: jest.fn(),
    getCorrectionMistakeText: jest.fn()
};
const textAnimationWrapperMock = jest.fn();

const imageItemMock = {
    item: "testItem"
}
const colorItemMock = {
    name: "testName"
}
const colorItemMatchMock = {
    name: "color1"
}
const colorsMock = [
    { name: "color1" }, { name: "color2" }, { name: "color3" }
]
const handleColorCorrectionStub = jest.fn();
const handleCorrectStub = jest.fn();

describe('TellColorPrompt', () => {

    let TellColorPrompt;

    beforeEach(async () => {
        jest.doMock('../../../../tools/text-data', () => textDataMock)
        jest.doMock('../../TextAnimationWrapper', () => textAnimationWrapperMock)

        textDataMock.getWrongText.mockImplementation((data1) => `testWrongText ${data1}`);
        textDataMock.getMistakeText.mockImplementation((data1) => `testMistakeText ${data1}`);
        textDataMock.getCorrectionText.mockImplementation((data1, data2) => `testCorrectionText ${data1} ${data2}`);
        textDataMock.getCorrectionMistakeText.mockImplementation((data1, data2) => `testCorrectionMistakeText ${data1} ${data2}`);
        textAnimationWrapperMock.mockImplementation(({textSourceArray}) => <>{textSourceArray}</>);

        const obj = await import('./TellColorPrompt.jsx');
        TellColorPrompt = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<TellColorPrompt imageItem={imageItemMock} colorItem={colorItemMock} colors={colorsMock} handleColorCorrection={handleColorCorrectionStub} />);
    })

    it('displays the text', () => {
        const { getByText } = render(<TellColorPrompt imageItem={imageItemMock} colorItem={colorItemMock} colors={colorsMock} handleColorCorrection={handleColorCorrectionStub} />);
        expect(getByText('testWrongText testItem')).toBeTruthy();
    })

    it('displays the colorItem', () => {
        const { getByText } = render(<TellColorPrompt imageItem={imageItemMock} colorItem={colorItemMock} colors={colorsMock} handleColorCorrection={handleColorCorrectionStub} />);
        expect(getByText('testName')).toBeTruthy();
    })

    it('displays color options on click', async () => {
        const { getByText } = render(<TellColorPrompt imageItem={imageItemMock} colorItem={colorItemMock} colors={colorsMock} handleColorCorrection={handleColorCorrectionStub} />);
        fireEvent.mouseDown(getByText('testName'));
        await waitFor(() => {
            expect(getByText('color1')).toBeTruthy();
            expect(getByText('color2')).toBeTruthy();
            expect(getByText('color3')).toBeTruthy();
        })
    })

    it('prompts user on color selection', async () => {
        const { getByText } = render(<TellColorPrompt imageItem={imageItemMock} colorItem={colorItemMock} colors={colorsMock} handleColorCorrection={handleColorCorrectionStub} />);
        fireEvent.mouseDown(getByText('testName'));
        await waitFor(() => {
            expect(getByText('color1')).toBeTruthy();
        });
        fireEvent.mouseDown(getByText('color1'))
        await waitFor(() => {
            expect(getByText('testCorrectionText testItem color1')).toBeTruthy();
            expect(getByText('No, sorry! Let me try again.')).toBeTruthy();
            expect(getByText('That\'s right!')).toBeTruthy();
        });
    })

    it('prompts user on wrong color correction', async () => {
        const { getByText } = render(<TellColorPrompt imageItem={imageItemMock} colorItem={colorItemMock} colors={colorsMock} handleColorCorrection={handleColorCorrectionStub} />);
        fireEvent.mouseDown(getByText('testName'));
        await waitFor(() => {
            expect(getByText('color1')).toBeTruthy();
        });
        fireEvent.mouseDown(getByText('color1'))
        await waitFor(() => {
            expect(getByText('No, sorry! Let me try again.')).toBeTruthy();
        });
        fireEvent.click(getByText('No, sorry! Let me try again.'))
        await waitFor(() => {
            expect(getByText('testMistakeText testItem')).toBeTruthy();
            expect(getByText('testName')).toBeTruthy();
        })
    })

    it('calls color correction', async () => {
        const { getByText } = render(<TellColorPrompt imageItem={imageItemMock} colorItem={colorItemMock} colors={colorsMock} handleColorCorrection={handleColorCorrectionStub} />);
        fireEvent.mouseDown(getByText('testName'));
        await waitFor(() => {
            expect(getByText('color1')).toBeTruthy();
        });
        fireEvent.mouseDown(getByText('color1'))
        await waitFor(() => {
            expect(getByText('No, sorry! Let me try again.')).toBeTruthy();
        });
        expect(handleColorCorrectionStub).not.toHaveBeenCalled();
        fireEvent.click(getByText('That\'s right!'))
        expect(handleColorCorrectionStub.mock.calls[0][0]).toBe(imageItemMock);
        expect(handleColorCorrectionStub.mock.calls[0][1]).toBe('color1');
    })

    it('prompts user on same color selection', async () => {
        const { getByText, getAllByText } = render(<TellColorPrompt imageItem={imageItemMock} colorItem={colorItemMatchMock} colors={colorsMock} handleColorCorrection={handleColorCorrectionStub} handleCorrect={handleCorrectStub} />);
        fireEvent.mouseDown(getAllByText('color1')[0]);
        await waitFor(() => {
            expect(getAllByText('color1')[1]).toBeTruthy();
        });
        fireEvent.mouseDown(getAllByText('color1')[1])
        await waitFor(() => {
            expect(getByText('testCorrectionMistakeText testItem color1')).toBeTruthy();
            expect(getByText('My mistake, smart-bot. Let me try again.')).toBeTruthy();
            expect(getByText('I\'m so sorry, smart-bot. You were right the first time.')).toBeTruthy();
        });
    })

    it('prompts user on same color correction wrong', async () => {
        const { getByText, getAllByText } = render(<TellColorPrompt imageItem={imageItemMock} colorItem={colorItemMatchMock} colors={colorsMock} handleColorCorrection={handleColorCorrectionStub} handleCorrect={handleCorrectStub} />);
        fireEvent.mouseDown(getAllByText('color1')[0]);
        await waitFor(() => {
            expect(getAllByText('color1')[1]).toBeTruthy();
        });
        fireEvent.mouseDown(getAllByText('color1')[1])
        await waitFor(() => {
            expect(getByText('My mistake, smart-bot. Let me try again.')).toBeTruthy();
        });
        fireEvent.click(getByText('My mistake, smart-bot. Let me try again.'))
        await waitFor(() => {
            expect(getByText('testMistakeText testItem')).toBeTruthy();
            expect(getAllByText('color1')[0]).toBeTruthy();
        })
    })

    it('calls color correct', async () => {
        const { getByText, getAllByText } = render(<TellColorPrompt imageItem={imageItemMock} colorItem={colorItemMatchMock} colors={colorsMock} handleColorCorrection={handleColorCorrectionStub} handleCorrect={handleCorrectStub} />);
        fireEvent.mouseDown(getAllByText('color1')[0]);
        await waitFor(() => {
            expect(getAllByText('color1')[1]).toBeTruthy();
        });
        fireEvent.mouseDown(getAllByText('color1')[1])
        await waitFor(() => {
            expect(getByText('My mistake, smart-bot. Let me try again.')).toBeTruthy();
        });
        expect(handleCorrectStub).not.toHaveBeenCalled();
        fireEvent.click(getByText('I\'m so sorry, smart-bot. You were right the first time.'))
        expect(handleCorrectStub.mock.calls[0][0]).toBe(imageItemMock);
        expect(handleCorrectStub.mock.calls[0][1]).toBe(colorItemMatchMock);
    })
})