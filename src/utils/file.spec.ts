import { convertBlobToFile } from './file';

describe('convertBlobToFile()', () => {
  it('should work correctly', () => {
    const blob = new Blob();

    const jpg = convertBlobToFile('foo.jpg')(blob);
    expect(jpg).toBeInstanceOf(File);
    expect(jpg.name).toEqual('uploaded.jpeg');
    expect(jpg.type).toEqual('image/jpeg');

    const jpeg = convertBlobToFile('foo.jpeg')(blob);
    expect(jpeg).toBeInstanceOf(File);
    expect(jpeg.name).toEqual('uploaded.jpeg');
    expect(jpeg.type).toEqual('image/jpeg');

    const png = convertBlobToFile('foo.png')(blob);
    expect(png).toBeInstanceOf(File);
    expect(png.name).toEqual('uploaded.png');
    expect(png.type).toEqual('image/png');

    const gif = convertBlobToFile('foo.gif')(blob);
    expect(gif).toBeInstanceOf(File);
    expect(gif.name).toEqual('uploaded.gif');
    expect(gif.type).toEqual('image/gif');
  });
});
