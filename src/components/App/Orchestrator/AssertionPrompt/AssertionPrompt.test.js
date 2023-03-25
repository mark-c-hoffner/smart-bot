import React from 'react';
import { fireEvent, render } from '@testing-library/react';

const imageItemMock = {
    item: "testItem"
}
const colorItemMock = {
    name: "testName"
}

const textDataMock = {
    getAssertionText: jest.fn()
};

const textAnimationWrapperMock = jest.fn();
const handleWrongStub = jest.fn();
const handleCorrectStub = jest.fn();

describe('AssertionPrompt', () => {

    let AssertionPrompt;

    beforeEach(async () => {
        jest.doMock('../../TextAnimationWrapper', () => textAnimationWrapperMock)
        jest.doMock('../../../../tools/text-data', () => textDataMock)

        textAnimationWrapperMock.mockReturnValue(<>textAnimationWrapperMock</>);
        textDataMock.getAssertionText.mockReturnValue(['testAssertionMessage']);

        const obj = await import('./AssertionPrompt.jsx');
        AssertionPrompt = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<AssertionPrompt imageItem={imageItemMock} colorItem={colorItemMock} handleWrong={handleWrongStub} handleCorrect={handleCorrectStub} />);
    })

    it('displays the text animation wrapper', () => {
        const { getByText } = render(<AssertionPrompt imageItem={imageItemMock} colorItem={colorItemMock} handleWrong={handleWrongStub} handleCorrect={handleCorrectStub} />);
        expect(getByText('textAnimationWrapperMock')).toBeTruthy();
    })

    it('passes the retrieved text', () => {
        render(<AssertionPrompt imageItem={imageItemMock} colorItem={colorItemMock} handleWrong={handleWrongStub} handleCorrect={handleCorrectStub} />);
        expect(textAnimationWrapperMock.mock.calls[0][0].textSourceArray[0]).toBe("testAssertionMessage");
    })

    it('calls handleWrong on click', () => {
        const { getByText } = render(<AssertionPrompt imageItem={imageItemMock} colorItem={colorItemMock} handleWrong={handleWrongStub} handleCorrect={handleCorrectStub} />);
        expect(handleWrongStub).not.toHaveBeenCalled();
        fireEvent.click(getByText('Wrong!'));
        expect(handleWrongStub).toHaveBeenCalledTimes(1);
    })

    it('calls handleCorrect on click', () => {
        const { getByText } = render(<AssertionPrompt imageItem={imageItemMock} colorItem={colorItemMock} handleWrong={handleWrongStub} handleCorrect={handleCorrectStub} />);
        expect(handleCorrectStub).not.toHaveBeenCalled();
        fireEvent.click(getByText('That\'s right!'));
        expect(handleCorrectStub).toHaveBeenCalledTimes(1);
    })
})