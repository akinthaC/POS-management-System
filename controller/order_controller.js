import OrderModel    from "../model/OrderModel.js";
import InvoiceModel from "../model/invoiceModel.js";

let order_array=[]
let invoiceDetail_array=[]
let customer_array=[]
let item_array=[]
const CusContactDropdown = document.getElementById("customerTelDropdownList");
const CusNameDropdown = document.getElementById("customerNameDropdownList");
const ItemCodeDropdown = document.getElementById("ItemCodeDropdownList");
const ItemNameDropdown = document.getElementById("ItemNameDropdownList");

function generateOrId() {
    $('#order-id').val(invoiceDetail_array.length + 1);
}
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();

}

function loadOrderArrayFromCookies() {
    const orderArrayCookie = getCookie("order_array");
    order_array = orderArrayCookie ? JSON.parse(orderArrayCookie) : [];
}

function loadInvoiceArrayFromCookies() {
    const invoiceArrayCookie = getCookie("invoiceDetail_array");
    invoiceDetail_array = invoiceArrayCookie ? JSON.parse(invoiceArrayCookie) : [];
}

function loadItemArrayFromCookies() {
    const itemArrayCookie = getCookie("item_array");
    item_array = itemArrayCookie ? JSON.parse(itemArrayCookie) : [];
}


const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

function setCustomerDataToDropDowns(){
    const CusArrayCookie = getCookie("customerArray");
    customer_array = CusArrayCookie ? JSON.parse(CusArrayCookie) : [];

    customer_array.forEach((item, index) => {
        const contact = item._contact;
        const name = item._cus_name;


        const contactOption = document.createElement("option");
        contactOption.value = contact;
        contactOption.textContent = contact;
        CusContactDropdown.appendChild(contactOption);


        const nameOption = document.createElement("option");
        nameOption.value = name;
        nameOption.textContent = name;
        CusNameDropdown.appendChild(nameOption);
    });

}

function setItemDataToDropDowns(){
    const itemArrayCookie = getCookie("item_array");
    item_array = itemArrayCookie ? JSON.parse(itemArrayCookie) : [];

    item_array.forEach((item, index) => {
        const code = item._itemCode;
        const name = item._itemName;


        const codeOption = document.createElement("option");
        codeOption.value = code;
        codeOption.textContent = code;
        ItemCodeDropdown.appendChild(codeOption);


        const nameOption = document.createElement("option");
        nameOption.value = name;
        nameOption.textContent = name;
        ItemNameDropdown.appendChild(nameOption);
    });

}

function setDate(){
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    $('#date').val(formattedDate);
}

$('#orders-nav').on('click', function() {
    setDate();
    setCustomerDataToDropDowns();
    setItemDataToDropDowns();
    loadOrderArrayFromCookies();
    loadInvoiceArrayFromCookies();
    loadItemArrayFromCookies();
    generateOrId();
    console.log(item_array);
    $('#discount').val("0%")


});




function setCusDataWithSearch(name,selectValue){
    console.log(name,selectValue);
    let type
    if(name==="contact"){
       type = "_contact";
    } else if(name==="Name"){
        type = "_cus_name";
    }

    const result = customer_array.find(customer => {
        return customer[type]?.toString() === selectValue;
    });


    if (result) {
        $('#customerNameDropdownList').val(result._cus_name);
        $('#customerTelDropdownList').val(result._contact);
        $('#email').val(result._email);
        $('#address').val(result._address);
    } else {

        $('#customerNameDropdownList').val('');
        $('#customerTelDropdownList').val('');
        $('#email').val('');
        $('#address').val('');
    }

}

function setItemDataWithSearch(name,selectValue){
    let type
    if(name==="Name"){
        type = "_itemName";
    }else if(name==="Code"){
        type="_itemCode";
    }

    const result = item_array.find(item => {
        return item[type]?.toString() === selectValue;
    })

    if (result) {
        $('#ItemCodeDropdownList').val(result._itemCode);
        $('#ItemNameDropdownList').val(result._itemName);
        $('#price').val(result._price);
        $('#qty').val(result._qty);

    }else {
        $('#itemNameDropdownList').val('');
        $('#itemTelDropdownList').val('');
        $('#price').val('');
        $('#qty').val('');
    }
}

CusContactDropdown.addEventListener("change", (event) => {
    const selectedContact = event.target.value;
    console.log("Selected Contact:", selectedContact);
    setCusDataWithSearch('contact', selectedContact);

});

CusNameDropdown.addEventListener("change", (event) => {
    const selectedName = event.target.value;
    console.log("Selected Name:", selectedName);
    setCusDataWithSearch('Name', selectedName);
});

ItemNameDropdown.addEventListener("change", (event) => {
    const selectedName = event.target.value;
    console.log("Selected Contact:", selectedName);
    setItemDataWithSearch('Name', selectedName);

});

ItemCodeDropdown.addEventListener("change", (event) => {
    const selectedCode = event.target.value;
    console.log("Selected Name:", selectedCode);
    setItemDataWithSearch('Code', selectedCode);
});

$('#AddToCart').on('click', function() {
    let orId=$('#order-id').val();
    let cusName=$('#customerNameDropdownList').val();
    let cusContact=$('#customerTelDropdownList').val();
    let itemName=$('#ItemNameDropdownList').val();
    let itemPrice=$('#price').val();
    let qty=$('#qty').val();
    let orderQty=$('#order-qty').val();
    let totalPrice= itemPrice * orderQty;
    let date = $('#date').val();
    let type ="_orId";

    if (parseInt(orderQty) >= parseInt($("#qty").val())) {
        alert("Please enter a valid order quantity.");
        return;
    }

    console.log(orId, cusName, cusContact, itemName, itemPrice, qty, totalPrice,date);
    let order= new OrderModel(orId,cusName,cusContact,itemName,itemPrice,orderQty,totalPrice,date);
    order_array.push(order);
    deleteCookie('order_array');
    setCookie("order_array", JSON.stringify(order_array), 7);
    getCookie(order_array);
    loadOrderArrayFromCookies();

    let itemIndex = item_array.findIndex(item => item._itemName === itemName);
    if (itemIndex !== -1) {

        let oldQty = parseInt(item_array[itemIndex]._qty);
        item_array[itemIndex]._qty= oldQty-orderQty;
        deleteCookie('item_array');
        setCookie("item_array", JSON.stringify(item_array), 7);
        getCookie(item_array);
        loadItemArrayFromCookies();

    } else {
        console.log("Item not found.");

    }



    loadOrderTable(type,orId);

});

$('#Purchase').on('click', function() {
    let orId=$('#order-id').val();
    let cusName=$('#customerNameDropdownList').val();
    let cusContact=$('#customerTelDropdownList').val();
    let email=$('#email').val();
    let address=$('#Address').val();
    let date=$('#date').val();
    let discount = $('#discount').val();
    let total=$('#lblTotal').text();
    let payAmount=$('#lblTotal').text();

    let invoice = new InvoiceModel(orId,cusName,cusContact,email,address,date)
    invoiceDetail_array.push(invoice);
    deleteCookie('invoiceDetail_array');
    setCookie("invoiceDetail_array", JSON.stringify(invoiceDetail_array), 7);
    getCookie(invoiceDetail_array);
    loadInvoiceArrayFromCookies();



});

document.getElementById("discount").addEventListener('input', function (event) {
    let total = parseFloat($('#lblTotal').text()) || 0;
    let discountPercentage = parseFloat(event.target.value) || 0;

    // Calculate subtotal after discount
    let subTotal = total - (total * discountPercentage / 100);
    $('#lblSubTotal').text(subTotal.toFixed(2));
});

document.getElementById("cash").addEventListener('input', function (event) {
    let total = parseFloat($('#lblSubTotal').text()) || 0;
    let cashAmount = parseFloat(event.target.value) || 0;

    // Calculate balance
    let balance = cashAmount - total;
    $('#balance').val(balance.toFixed(2));
});


const loadOrderTable = (searchType, searchValue) => {
    let netTotal = 0;

    const results = order_array.filter(item => {
        return item[searchType]?.toString() === searchValue;
    });

    // Display search results in the table or show a message if no results found
    $('#orderTableBody').empty();
    if (results.length > 0) {
        console.log("Search results:", results);
        results.forEach(item => {
            netTotal += parseFloat(item._orTotal);
            let orderData = `<tr> 
            <td>${item._orId}</td> 
            <td>${item._orItemName}</td> 
            <td>${item._orItemPrice}</td> 
            <td>${item._orQty}</td> 
            <td>${item._orTotal}</td>
        </tr>`;
            $('#orderTableBody').append(orderData);
        });
        $('#lblTotal').text(netTotal.toFixed(2));
        $('#lblSubTotal').text(netTotal.toFixed(2));


    } else {
        console.log("No customer found matching the search criteria.");
        $('#orderTableBody').append('<tr><td colspan="5">No matching customer found.</td></tr>');
    }



}