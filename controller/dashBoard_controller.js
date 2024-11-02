import {order_array} from "../db/dataBase.js";
import {customer_array} from "../db/dataBase.js";
import {item_array} from "../db/dataBase.js";
import {invoiceDetail_array} from "../db/dataBase.js";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();

}
function loadInvoiceArrayFromCookies() {
    const invoiceArrayCookie = getCookie("invoiceDetail_array");
    if (invoiceArrayCookie) {
        invoiceDetail_array.length = 0;
        invoiceDetail_array.push(...JSON.parse(invoiceArrayCookie));
    }
}
getCookie(invoiceDetail_array);
loadInvoiceArrayFromCookies();
$('#order_count').text(invoiceDetail_array.length);

$('#most_selling_item').text(invoiceDetail_array.length+1);



