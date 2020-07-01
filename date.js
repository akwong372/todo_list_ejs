var today = new Date();

var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
};

var currentDate = today.toLocaleDateString('en-US', options);

module.exports = currentDate;