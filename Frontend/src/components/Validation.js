const number = (value) => {
    return !isNaN(parseFloat(value));
};

const empty = (value) => {
    const val = value
    // ? value.trim() : value;
    return !Boolean(val);
};

const boolean = (value) => {
    if ((typeof value === "boolean")) {
        return true;
    } else if (value === true || value === false || value === 'true') {
        return true;
    } else {
        return false;
    }
}

const min2 = (value) => {
    return !empty(value) && value.length >= 2;
};

const minOf = (value, min) => {
    return !empty(value) && value.length >= min;
};

const name = (value) => {
    const reName = /^[a-zA-Z0-9-_]+$/;
    return value.length >= 2 && value.length <= 20 && reName.test(value);
};

const email = (value) => {
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
};

const numericPhone = (value) => {
    const reNum = /^[0-9]*$/;
    return !empty(value) && value.length >= 5 && reNum.test(value);
}

const phone = (value) => {
    // const rePhone = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;
    const rePhone = /^(\+\d{1,3}[- ]?)?\d{11}$/
    return !empty(value) && rePhone.test(value);
}

const password = (value) => {
    const re = /^[a-zA-Z0-9!@#$%^&]+$/;
    return !empty(value) && value.length >= 4 && value.length <= 12 && re.test(value);
};

// const date = (value) => {
//   return moment(value).isValid();
// }

const url = (str) => {
    const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
        return true;
    }
    else {
        return false;
    }
}

export const Validation = {
    empty,
    boolean,
    min2,
    minOf,
    name,
    number,
    numericPhone,
    email,
    phone,
    password,
    url,
};