import { convertBlobToFile } from './file';

describe('convertBlobToFile()', () => {
  it('should work correctly', () => {
    const blob = new Blob();

    const jpg = convertBlobToFile('foo.jpg')(blob);
    expect(jpg).toBeInstanceOf(File);
    expect(jpg.type).toEqual('image/jpeg');

    const jpeg = convertBlobToFile('foo.jpeg')(blob);
    expect(jpeg).toBeInstanceOf(File);
    expect(jpeg.type).toEqual('image/jpeg');

    const png = convertBlobToFile('foo.png')(blob);
    expect(png).toBeInstanceOf(File);
    expect(png.type).toEqual('image/png');

    const gif = convertBlobToFile('foo.gif')(blob);
    expect(gif).toBeInstanceOf(File);
    expect(gif.type).toEqual('image/gif');
  });
});
