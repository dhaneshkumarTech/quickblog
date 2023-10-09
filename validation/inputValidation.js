function isEmailValid(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export default { isEmailValid }