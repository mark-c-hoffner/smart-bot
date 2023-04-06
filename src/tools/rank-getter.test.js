const randomMock = jest.fn();
const textDataMock = {
    getAvailableRankings: jest.fn()
};

describe('rank-getter.js', () => {
    
    let rank;

    beforeEach(async () => {
        jest.doMock('./random', () => randomMock)
        jest.doMock('./text-data', () => textDataMock)

        randomMock.mockReturnValue(0);
        textDataMock.getAvailableRankings.mockReturnValue(["one", "two", "three"])

        const obj = await import('./rank-getter.js');
        rank = obj.default;
    })

    afterEach(() => {
        jest.resetAllMocks();
    })
    
    it('calls random with the length of available ranking', () => {
        expect(randomMock.mock.calls[0][0]).toBe(0);
        expect(randomMock.mock.calls[0][1]).toBe(2);
    })
    
    it('returns the correct ranking', () => {
        expect(rank).toBe("one");
    })
})