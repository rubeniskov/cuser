const deepmerge = require('deepmerge');
const repo = 'https://github.com/rubeniskov/cuser/packages/proto/schemas';
const defaults = {
  Content: {
    data: {
      minLength: 16,
      maxLength: 168
    }
  },
  User: {
    username: {
      minLength: 4,
      maxLength: 16
    }
  }
}


module.exports = (props) => Object.entries(deepmerge({}, defaults, props)).map(([schemaName, defs]) => ({
  "$patch": {
    "source": { "$ref": `${repo}/${schemaName}.json#` },
    "with": Object.entries(defs).map(([propName, validators]) => ({ "op": "add", "path": `/properties/${propName}`, "value": validators }))
  }
}))

