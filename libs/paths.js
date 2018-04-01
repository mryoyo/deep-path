const paths = (result, parent, value) => {
  if (value == null) {
    return parent.length ? [...result, parent.join('.')] : [...result];
  } else if (typeof value == 'undefined') {
    return [...result];
  } else if (Array.isArray(value)) {
    return [...result, ...pathsArray(parent, value)];
  } else if (typeof value == 'object') {
    return [...result, ...pathsObject(parent, value)];
  } else {
    return [...result, parent.join('.')];
  }
};

const pathsArray = (parent, arrValue) => {
  return arrValue.reduce((prev, curr, index) => {
    const _parent = [...parent];
    const lparent = _parent.pop();
    _parent.push(lparent ? `${lparent}[${index}]` : `[${index}]`);
    return paths(prev, _parent, curr);
  }, []);
};

const pathsObject = (parent, objValue) => {
  return Object.keys(objValue).reduce((prev, curr) => {
    const _parent = [...parent, curr];
    return paths(prev, _parent, objValue[curr]);
  }, []);
};

const _paths = obj => paths([], [], obj);

module.exports = { paths: _paths };
