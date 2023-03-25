import React from 'react';
import { render, fireEvent } from '@testing-library/react';

const imageItemMock = {
    item: "testItem"
}
const colorItemMock = {
    name: "testName"
}

const textAnimationWrapperMock = jest.fn();
const getAnAssertionStub = jest.fn();
const dummyText = ["This is dummy text."];

describe('CorrectResponsePrompt', () => {

    let CorrectResponsePrompt;

    beforeEach(async () => {
        jest.doMock('../../TextAnimationWrapper', () => textAnimationWrapperMock)
        textAnimationWrapperMock.mockReturnValue(<>textAnimationWrapperMock</>);

        const obj = await import('./CorrectResponsePrompt.jsx');
        CorrectResponsePrompt = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<CorrectResponsePrompt imageItem={imageItemMock} colorItem={colorItemMock} getAnAssertion={getAnAssertionStub} promptText={dummyText}/>);
    })

    it('displays the text animation wrapper', () => {
        const { getByText } = render(<CorrectResponsePrompt imageItem={imageItemMock} colorItem={colorItemMock} getAnAssertion={getAnAssertionStub} promptText={dummyText}/>);
        expect(getByText('textAnimationWrapperMock')).toBeTruthy();
    })

    it('passes the text', () => {
        render(<CorrectResponsePrompt imageItem={imageItemMock} colorItem={colorItemMock} getAnAssertion={getAnAssertionStub} promptText={dummyText}/>);
        expect(textAnimationWrapperMock.mock.calls[0][0].textSourceArray[0]).toBe("This is dummy text.");
    })

    it('calls assertion component after user click', () => {
        const { getByText } = render(<CorrectResponsePrompt imageItem={imageItemMock} colorItem={colorItemMock} getAnAssertion={getAnAssertionStub} promptText={dummyText}/>);
        expect(getAnAssertionStub).not.toHaveBeenCalled();
        fireEvent.click(getByText('What else do you know?'));
        expect(getAnAssertionStub).toHaveBeenCalledTimes(1);
        expect(getAnAssertionStub.mock.calls[0][0]).toBe(colorItemMock);
    })
})