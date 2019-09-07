String.prototype.toTitleCase = function () {
    return this.replace(
        /\w\S*/g,
        value => value.charAt(0).toUpperCase() + value.substr(1).toLowerCase()
    );
};