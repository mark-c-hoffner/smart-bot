import React from 'react';
import { render, fireEvent } from '@testing-library/react';

const imageItemMock = {
    item: "testItem"
}
const colorItemMock = {
    name: "testName"
}
const getAnAssertionStub = jest.fn();
const dummyText = "This is dummy text.";

describe('CorrectResponsePrompt', () => {

    let CorrectResponsePrompt;

    beforeEach(async () => {
        const obj = await import('./CorrectResponsePrompt.jsx');
        CorrectResponsePrompt = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<CorrectResponsePrompt imageItem={imageItemMock} colorItem={colorItemMock} getAnAssertion={getAnAssertionStub} promptText={dummyText}/>);
    })

    it('displays the text', () => {
        const { getByText } = render(<CorrectResponsePrompt imageItem={imageItemMock} colorItem={colorItemMock} getAnAssertion={getAnAssertionStub} promptText={dummyText}/>);
        expect(getByText('This is dummy text.')).toBeTruthy();
    })

    it('calls assertion component after user click', () => {
        const { getByText } = render(<CorrectResponsePrompt imageItem={imageItemMock} colorItem={colorItemMock} getAnAssertion={getAnAssertionStub} promptText={dummyText}/>);
        expect(getAnAssertionStub).not.toHaveBeenCalled();
        fireEvent.click(getByText('Want to know something else?'));
        expect(getAnAssertionStub).toHaveBeenCalledTimes(1);
        expect(getAnAssertionStub.mock.calls[0][0]).toBe(colorItemMock);
    })
})