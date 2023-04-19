const randomMock = jest.fn();
const matchDataMock = [];
const imageDataMock = [];

describe('match-data-manager.js', () => {

    let obj;

    beforeEach(async () => {
        jest.doMock('./random', () => randomMock)
        jest.doMock('./match-data', () => matchDataMock)
        jest.doMock('./color-image-data', () => imageDataMock)

        matchDataMock[0] = { name: "mock2", match: "none" };
        matchDataMock[1] = { name: "mock3", match: "id3" };
        matchDataMock[2] = { name: "mock1", match: "id1" };
        imageDataMock[0] = { item: "3", id: "id1" };
        imageDataMock[1] = { item: "2", id: "id3" };
        imageDataMock[2] = { item: "1", id: "id5" };

        obj = await import('./match-data-manager.js');
        obj.resetMatchData();
    })

    afterEach(() => {
        jest.resetAllMocks();
    })
    
    it('returns an image item based on the return from random', () => {
        randomMock.mockReturnValue(0);
        expect(obj.getRandomImageItem(null).id).toBe('id1');
    })
    
    it('removes given image item before returning random', () => {
        randomMock.mockReturnValue(1);
        expect(obj.getRandomImageItem(imageDataMock[1]).id).toBe('id5');
    })

    it('returns a color based on the return from random when not matching an image', () => {
        randomMock.mockReturnValue(0);
        expect(obj.getColorItemFromImage(imageDataMock[2]).name).toBe('mock2');
    })

    it('returns a color matching the given image', () => {
        randomMock.mockReturnValue(0);
        expect(obj.getColorItemFromImage(imageDataMock[0]).name).toBe('mock1');
    })

    it('returns an updated color item with a new match', () => {
        expect(obj.updateColors(imageDataMock[0], matchDataMock[0].name).match).toBe('id1');
    })

    it('returns a color item when ids match', () => {
        expect(obj.updateColors(imageDataMock[1], matchDataMock[1].name).match).toBe('id3');
    })

    it('returns all matchdata', () => {
        expect(obj.getAllColorOptions()).toBe(matchDataMock);
    })
})