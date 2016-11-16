module.exports = function runGenerator(g) {
    (function step(g, arg) {
        var res = g.next(arg);

        if (res.done) return res.value;

        if (typeof res.value.then === 'function') {
            res.value
                .then(res => step(g, res))
                .catch(err => g.throw(err));
        } else {
            step(g, res);
        }
    })(g);
}