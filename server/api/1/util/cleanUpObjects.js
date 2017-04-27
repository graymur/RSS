export function cleanUp(arg) {
    if (Array.isArray(arg)) {
        return function(item) {
            arg.forEach(field => {
                delete item[field];
            });

            return cleanUp(item);
        }
    } else {
        arg.id = arg._id;
        delete arg._id;
        delete arg.__v;
        delete arg.user;
        return arg;
    }
}

export function toObject(item) {
    return item.toObject();
}

export function toCleanObject(arg) {
    if (Array.isArray(arg)) {
        return function (item) {
            return cleanUp(arg)(toObject(item));
        }
    } else {
        return cleanUp(toObject(arg));
    }
}
