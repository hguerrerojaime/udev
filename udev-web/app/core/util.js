exports.parameterfy = (function() {
    var pattern = /function[^(]*\(([^)]*)\)/;

    return function(func, instance = undefined) {
        // fails horribly for parameterless functions ;)

        var args = func.toString().match(pattern)[1].split(/,\s*/).filter((arg) => arg != '');

        return function() {
            var named_params = arguments[arguments.length - 1];

            var $instance = this;

            if (instance) {
              $instance = instance;
            }

            if (typeof named_params === 'object') {
                var params = [].slice.call(arguments, 0, -1);

                if (params.length < args.length) {
                    for (var i = params.length, l = args.length; i < l; i++) {
                        params.push(named_params[args[i]]);
                    }
                    return func.apply($instance, params);
                }
            }
            return func.apply($instance, arguments);
        };
    };
}());
