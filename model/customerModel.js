export default class CustomerModel {
    constructor(cus_id,cus_name,address,contact,email) {
        this._cus_id = cus_id;
        this._cus_name = cus_name;
        this._address = address;
        this._contact = contact;
        this._email = email;
    }


    get cus_id() {
        return this._cus_id;
    }

    set cus_id(value) {
        this._cus_id = value;
    }

    get cus_name() {
        return this._cus_name;
    }

    set cus_name(value) {
        this._cus_name = value;
    }

    get address() {
        return this._address;
    }

    set address(value) {
        this._address = value;
    }

    get contact() {
        return this._contact;
    }

    set contact(value) {
        this._contact = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }
}