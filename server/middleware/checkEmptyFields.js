const checkEmptyFields = (fields) => {
    let emptyFields = [];

    Object.entries(fields).forEach(([fieldName, fieldValue]) => {
        if (!fieldValue || fieldValue === null || fieldValue === undefined || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
          emptyFields.push(fieldName);
        }
    });
    return emptyFields;
}

module.exports = checkEmptyFields;