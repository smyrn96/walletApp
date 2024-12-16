const AppError = require("./appError");

exports.getImmutableFields = (schema) => {
  const immutableFields = [];

  schema.eachPath((path, schemaType) => {
    if (schemaType.options && schemaType.options.immutable) {
      immutableFields.push(path);
    }
  });

  return immutableFields;
};
exports.preUpdateImmutableFieldsMiddleware = (schema, getImmutableFields) => {
  schema.pre(["findOneAndUpdate", "updateOne"], async function (next) {
    const immutableFields = getImmutableFields(schema);
    const update = this.getUpdate();

    immutableFields.forEach(function (field) {
      if (update[field]) {
        return next(
          new AppError(`Cannot modify immutable fields: ${field}`, 400)
        );
      }
    }, this);

    next();
  });
};
