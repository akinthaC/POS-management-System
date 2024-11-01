export default class OrderModel {
    constructor(orId, orCusName, orCusContact, orItemName, orItemPrice, orQty, orTotal,orDate) {
        this._orId = orId;
        this._orCusName = orCusName;
        this._orCusContact = orCusContact;
        this._orItemName = orItemName;
        this._orItemPrice = orItemPrice;
        this._orQty = orQty;
        this._orTotal = orTotal;
        this._orDate = orDate;

    }

    get orId() {
        return this._orId;
    }

    set orId(value) {
        this._orId = value;
    }

    get orCusName() {
        return this._orCusName;
    }

    set orCusName(value) {
        this._orCusName = value;
    }

    get orCusContact() {
        return this._orCusContact;
    }

    set orCusContact(value) {
        this._orCusContact = value;
    }

    get orItemName() {
        return this._orItemName;
    }

    set orItemName(value) {
        this._orItemName = value;
    }

    get orItemPrice() {
        return this._orItemPrice;
    }

    set orItemPrice(value) {
        this._orItemPrice = value;
    }

    get orQty() {
        return this._orQty;
    }

    set orQty(value) {
        this._orQty = value;
    }

    get orTotal() {
        return this._orTotal;
    }

    set orTotal(value) {
        this._orTotal = value;
    }

    get orDate() {
        return this._orDate;
    }

    set orDate(value) {
        this._orDate = value;
    }
}