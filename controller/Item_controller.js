import ItemModel from "../model/itemModel.js";
import {item_array} from "../db/dataBase.js";


let selected_item_index;
const generateNextItemId =() =>{
    $('#itemCode').val(item_array.length+1)
    $('#itemName').val(null)
    $('#itemPrice').val(null)
    $('#itemQuantity').val(null)
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();

}

function loadItemArrayFromCookies() {
    const ItemArrayCookie = getCookie("item_array");
    if (ItemArrayCookie) {
        item_array.length = 0;
        item_array.push(...JSON.parse(ItemArrayCookie));
    }
}

const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};


function initialize() {

    loadItemArrayFromCookies();

    loadItemTable()


}

const loadItemTable = () => {
    $('#ItemTableBody').empty();

    // Loop through `item_array` and add each item as a row in the table
    item_array.forEach((item) => {
        let data = `<tr> 
             <td>${item._itemCode}</td> 
            <td>${item._itemName}</td> 
            <td>${item._price}</td> 
            <td>${item._qty}</td>
        </tr>`;
        $('#ItemTableBody').append(data);
    });

    // Generate the next item ID based on array length
    generateNextItemId();
};


initialize();

$('#ItemNew').on('click', function(){
    generateNextItemId();

})
$('#add_new_Item_Button').on('click', function(){

    console.log('clicked');
    let code = $('#itemCode').val();
    let name = $('#itemName').val();
    let price = $('#itemPrice').val();
    let qty = $('#itemQuantity').val();

    console.log(code, name, price,qty);

    let item =new ItemModel(code, name, price, qty);

    item_array.push(item);
    console.log(item);
    deleteCookie("item_array");
    setCookie("item_array", JSON.stringify(item_array), 7);
    getCookie(item_array);
    loadItemArrayFromCookies();

    loadItemTable();
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
    });

})

$('#itemSearch').on('click', function() {
    let searchType = $('#itemSearchByDropDown').val();
    let searchValue = $('#txtItemSearch').val().trim();

    // Map searchType to actual customer object properties
    if (searchType === "Name") {
        searchType = "_itemName";
    } else if (searchType === "ID") {
        searchType = "_itemCode";
    }
    // Filter the customer array based on the search criteria
    const results = item_array.filter(item => {
        return item[searchType]?.toString() === searchValue;
    });

    // Display search results in the table or show a message if no results found
    $('#ItemTableBody').empty();
    if (results.length > 0) {
        console.log("Search results:", results);
        results.forEach(item => {
            const cusData = `<tr>
               <td>${item._itemCode}</td> 
                <td>${item._itemName}</td> 
                <td>${item._price}</td> 
                <td>${item._qty}</td>
            </tr>`;
            $('#ItemTableBody').append(cusData);
        });
    } else {
        console.log("No customer found matching the search criteria.");
        $('#ItemTableBody').append('<tr><td colspan="5">No matching customer found.</td></tr>');
    }
});


$('#ViewAllItem').on('click', function() {
    loadItemTable();
});

$('#ItemTableBody').on('click', 'tr', function() {
    selected_item_index = $(this).index();
    console.log(selected_item_index);
    console.log(item_array);
    let item_row = item_array[selected_item_index];

    $('#itemCode1').val(item_row._itemCode);
    $('#itemName1').val(item_row._itemName);
    $('#itemPrice1').val(item_row._price);
    $('#itemQuantity1').val(item_row._qty);

    console.log("Selected customer:", item_row);

});


$('#add_update_Item_Button').on('click', function() {
    let code = $('#itemCode1').val();
    let name = $('#itemName1').val();
    let price = $('#itemPrice1').val();
    let qty = $('#itemQuantity1').val();

    console.log(code, name, price,qty);

    let item =new ItemModel(code, name, price, qty);
    item_array[selected_item_index] = item;
    deleteCookie(item_array)
    setCookie("item_array", JSON.stringify(item_array), 7);
    getCookie(item_array);
    loadItemArrayFromCookies();
    loadItemTable();
});

$('.delete_Item_Button').on('click', function() {
    console.log('delete')
    item_array.splice(selected_item_index, 1);
    deleteCookie(item_array)
    setCookie("item_array", JSON.stringify(item_array), 7);
    getCookie(item_array);
    loadItemArrayFromCookies();
    loadItemTable()
    $('#itemModal1').modal('hide');
});