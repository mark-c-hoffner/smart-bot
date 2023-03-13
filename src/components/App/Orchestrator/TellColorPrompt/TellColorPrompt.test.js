import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

const imageItemMock = {
    item: "testItem"
}
const colorItemMock = {
    name: "testName"
}
const colorsMock = [
    { name: "color1" }, { name: "color2" }, { name: "color3" }
]
const handleColorCorrectionStub = jest.fn();

describe('TellColorPrompt', () => {

    let TellColorPrompt;

    beforeEach(async () => {
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
        expect(getByText('Oh no! :( I\'m so sorry. You must be very smart-bot. Would you be able to help me become smart like you? What color is testItem?')).toBeTruthy();
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
            expect(getByText('Great! Thanks for your help! So testItem is actually the color color1?')).toBeTruthy();
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
            expect(getByText('That\'s okay! We all make mistakes. :) ha ha. So then what color is testItem?')).toBeTruthy();
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
})