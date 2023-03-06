import React from 'react';
import { fireEvent, render } from '@testing-library/react';

const pictureItemMock = {
    item: "testItem"
}
const colorItemMock = {
    name: "testName"
}
const handleWrongStub = jest.fn();
const handleCorrectStub = jest.fn();

describe('AssertionPrompt', () => {

    let AssertionPrompt;

    beforeEach(async () => {
        const obj = await import('./AssertionPrompt.jsx');
        AssertionPrompt = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<AssertionPrompt pictureItem={pictureItemMock} colorItem={colorItemMock} handleWrong={handleWrongStub} handleCorrect={handleCorrectStub} />);
    })

    it('displays the assertion', async () => {
        const { getByText } = render(<AssertionPrompt pictureItem={pictureItemMock} colorItem={colorItemMock} handleWrong={handleWrongStub} handleCorrect={handleCorrectStub} />);
        expect(getByText('The testItem is the color testName. :)')).toBeTruthy();
    })

    it('calls handleWrong on click', () => {
        const { getByText } = render(<AssertionPrompt pictureItem={pictureItemMock} colorItem={colorItemMock} handleWrong={handleWrongStub} handleCorrect={handleCorrectStub} />);
        expect(handleWrongStub).not.toHaveBeenCalled();
        fireEvent.click(getByText('Wrong!'));
        expect(handleWrongStub).toHaveBeenCalledTimes(1);
    })

    it('calls handleCorrect on click', () => {
        const { getByText } = render(<AssertionPrompt pictureItem={pictureItemMock} colorItem={colorItemMock} handleWrong={handleWrongStub} handleCorrect={handleCorrectStub} />);
        expect(handleCorrectStub).not.toHaveBeenCalled();
        fireEvent.click(getByText('That\'s right!'));
        expect(handleCorrectStub).toHaveBeenCalledTimes(1);
    })
})