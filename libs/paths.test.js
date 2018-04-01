const { expect } = require('chai');
const { paths } = require('./paths');

describe('object-path', () => {
  it('null', () => {
    expect(paths(null)).to.deep.equal([]);
  });
  it('flat object', () => {
    expect(paths({ a: 1 })).to.deep.equal(['a']);
    expect(paths({ a: 1, b: 1 })).to.deep.equal(['a', 'b']);
  });
  it('nested object', () => {
    expect(paths({ a: { b: 1 } })).to.deep.equal(['a.b']);
    expect(paths({ a: { b: 1, c: 1 } })).to.deep.equal(['a.b', 'a.c']);
    expect(paths({ a: { b: 1, c: 1 }, d: 1 })).to.deep.equal([
      'a.b',
      'a.c',
      'd'
    ]);
  });
  it('array', () => {
    expect(paths([1, 2, 3])).to.deep.equal(['[0]', '[1]', '[2]']);
    expect(paths([, , 3])).to.deep.equal(['[2]']);
    expect(paths([1, , 3])).to.deep.equal(['[0]', '[2]']);
    expect(paths([1, null, 3])).to.deep.equal(['[0]', '[1]', '[2]']);
  });
  it('mixed', () => {
    expect(paths({ a: 1, b: [{ a: 1 }] })).to.deep.equal(['a', 'b[0].a']);
    expect(paths({ a: 1, b: [1, { a: 1 }] })).to.deep.equal([
      'a',
      'b[0]',
      'b[1].a'
    ]);
  });
  it('irregular key', () => {
    expect(paths({ 'a-a': 1 })).to.deep.equal(['a-a']);
    expect(paths({ 'a.a': 1 })).to.deep.equal(['a.a']);
  });
});
