module.exports = function (v, print = true) {
    const string = JSON.stringify(v, null, 4);
    if (print) console.log(string);
    return string;
};
