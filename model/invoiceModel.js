export default class InvoiceModel {
    constructor(invoiceOrId, invoiceCusName, invoiceCusContact, invoiceItemName, invoiceItemPrice, invoiceQty, invoiceDate, invoiceTotal,invoiceDiscount,invoicePayAmount) {
        this._invoiceOrId = invoiceOrId;
        this._invoiceCusName = invoiceCusName;
        this._invoiceCusContact = invoiceCusContact;
        this._invoiceItemName = invoiceItemName;
        this._invoiceItemPrice = invoiceItemPrice;
        this._invoiceQty = invoiceQty;
        this._invoiceDate = invoiceDate;
        this._invoiceTotal = invoiceTotal;
        this._invoiceDiscount = invoiceDiscount;
        this._invoicePayAmount = invoicePayAmount;

    }

    get invoiceOrId() {
        return this._invoiceOrId;
    }

    set invoiceOrId(value) {
        this._invoiceOrId = value;
    }

    get invoiceCusName() {
        return this._invoiceCusName;
    }

    set invoiceCusName(value) {
        this._invoiceCusName = value;
    }

    get invoiceCusContact() {
        return this._invoiceCusContact;
    }

    set invoiceCusContact(value) {
        this._invoiceCusContact = value;
    }

    get invoiceItemName() {
        return this._invoiceItemName;
    }

    set invoiceItemName(value) {
        this._invoiceItemName = value;
    }

    get invoiceItemPrice() {
        return this._invoiceItemPrice;
    }

    set invoiceItemPrice(value) {
        this._invoiceItemPrice = value;
    }

    get invoiceQty() {
        return this._invoiceQty;
    }

    set invoiceQty(value) {
        this._invoiceQty = value;
    }

    get invoiceTotal() {
        return this._invoiceTotal;
    }

    set invoiceTotal(value) {
        this._invoiceTotal = value;
    }

    get invoiceDate() {
        return this._invoiceDate;
    }

    set invoiceDate(value) {
        this._invoiceDate = value;

    }

    get invoiceDiscount() {
        return this._invoiceDiscount;
    }

    set invoiceDiscount(value) {
        this._invoiceDiscount = value;
    }

    get invoicePayAmount() {
        return this._invoicePayAmount;
    }

    set invoicePayAmount(value) {
        this._invoicePayAmount = value;
    }
}