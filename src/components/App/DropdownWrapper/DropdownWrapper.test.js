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
const handleDropdownChangeMock = jest.fn();

describe('DropdownWrapper', () => {

    let DropdownWrapper;

    beforeEach(async () => {
        const obj = await import('./DropdownWrapper.jsx');
        DropdownWrapper = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })

    it('renders without crashing', () => {
        render(<DropdownWrapper imageItem={imageItemMock} colorItem={colorItemMock} colors={colorsMock} handleDropdownChange={handleDropdownChangeMock} />);
    })

    it('displays the colorItem', () => {
        const { getByText } = render(<DropdownWrapper imageItem={imageItemMock} colorItem={colorItemMock} colors={colorsMock} handleDropdownChange={handleDropdownChangeMock} />);
        expect(getByText('testName')).toBeTruthy();
    })

    it('displays color options on click', async () => {
        const { getByText } = render(<DropdownWrapper imageItem={imageItemMock} colorItem={colorItemMock} colors={colorsMock} handleDropdownChange={handleDropdownChangeMock} />);
        fireEvent.mouseDown(getByText('testName'));
        await waitFor(() => {
            expect(getByText('color1')).toBeTruthy();
            expect(getByText('color2')).toBeTruthy();
            expect(getByText('color3')).toBeTruthy();
        })
    })

    it('calls handler on selection', async () => {
        const { getByText } = render(<DropdownWrapper imageItem={imageItemMock} colorItem={colorItemMock} colors={colorsMock} handleDropdownChange={handleDropdownChangeMock} />);
        fireEvent.mouseDown(getByText('testName'));
        await waitFor(() => {
            expect(getByText('color1')).toBeTruthy();
        });
        expect(handleDropdownChangeMock).not.toHaveBeenCalled();
        fireEvent.mouseDown(getByText('color1'))
        expect(handleDropdownChangeMock.mock.calls[0][0]).toBe(imageItemMock);
        expect(handleDropdownChangeMock.mock.calls[0][1]).toBe(colorItemMock);
        expect(handleDropdownChangeMock.mock.calls[0][2].value).toBe('color1');
    })
})