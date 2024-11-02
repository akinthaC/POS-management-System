/*Customer*/
import CustomerModel from "../model/customerModel.js";
import { customer_array } from "../db/dataBase.js";
let selected_cus_index;

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

function loadCustomerArrayFromCookies() {
    const CusArrayCookie = getCookie("customerArray");
    if (CusArrayCookie) {
        customer_array.length = 0; // Clear existing array
        customer_array.push(...JSON.parse(CusArrayCookie)); // Populate with data from cookies
    }
}


const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

const generateNextCusId = () => {
    $('#cusId').val(customer_array.length + 1);
    $('#cusName, #cusAddress, #cusContact, #cusEmail').val(null);
}

function initialize() {

    loadCustomerArrayFromCookies();
    loadCustomerTable();
    generateNextCusId();



}

// Load customer data into the table
const loadCustomerTable = () => {
    $('#customerTableBody').empty();
    customer_array.forEach((item, index) => {
        let cusData = `<tr> 
            <td>${item._cus_id}</td> 
            <td>${item._cus_name}</td> 
            <td>${item._address}</td> 
            <td>${item._contact}</td> 
            <td>${item._email}</td>
        </tr>`;
        $('#customerTableBody').append(cusData);
    });
    generateNextCusId();
}

initialize();

$('#cusNew').on('click', function() {
    generateNextCusId();
});

$('#cus_add-button').on('click', function() {
    console.log('Adding new customer');
    let Cus_Id = $('#cusId').val();
    let Cus_name = $('#cusName').val();
    let address = $('#cusAddress').val();
    let contact = $('#cusContact').val();
    let email = $('#cusEmail').val();

    let customer = new CustomerModel(Cus_Id, Cus_name, address, contact, email);
    console.log(customer);

    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500
    });

    customer_array.push(customer);
    deleteCookie("customerArray");
    setCookie("customerArray", JSON.stringify(customer_array), 7);
    getCookie("customerArray");
    loadCustomerArrayFromCookies()
    loadCustomerTable();

});

// Customer Search
$('#cusSearch').on('click', function() {
    let searchType = $('#cusSearchByDropDown').val();
    let searchValue = $('#txtSearch').val().trim();

    // Map searchType to actual customer object properties
    if (searchType === "Name") {
        searchType = "_cus_name";
    } else if (searchType === "ID") {
        searchType = "_cus_id";
    } else if (searchType === "Contact") {
        searchType = "_contact";
    }

    // Filter the customer array based on the search criteria
    const results = customer_array.filter(customer => {
        return customer[searchType]?.toString() === searchValue;
    });

    // Display search results in the table or show a message if no results found
    $('#customerTableBody').empty();
    if (results.length > 0) {
        console.log("Search results:", results);
        results.forEach(customer => {
            const cusData = `<tr>
                <td>${customer._cus_id}</td> 
                <td>${customer._cus_name}</td> 
                <td>${customer._address}</td> 
                <td>${customer._contact}</td> 
                <td>${customer._email}</td>
            </tr>`;
            $('#customerTableBody').append(cusData);
        });
    } else {
        console.log("No customer found matching the search criteria.");
        $('#customerTableBody').append('<tr><td colspan="5">No matching customer found.</td></tr>');
    }
});

$('#ViewAll').on('click', function() {
    loadCustomerTable();
});

$('#customerTableBody').on('click', 'tr', function() {
    selected_cus_index = $(this).index();
    let customer_row = customer_array[selected_cus_index];

    console.log("Selected customer:", customer_row);

    $('#cusId1').val(customer_row._cus_id);
    $('#cusName1').val(customer_row._cus_name);
    $('#cusAddress1').val(customer_row._address);
    $('#cusContact1').val(customer_row._contact);
    $('#cusEmail1').val(customer_row._email);
});

$('#cus_Update_button').on('click', function() {
    let Cus_Id = $('#cusId1').val();
    let Cus_name = $('#cusName1').val();
    let address = $('#cusAddress1').val();
    let contact = $('#cusContact1').val();
    let email = $('#cusEmail1').val();

    let customer = new CustomerModel(Cus_Id, Cus_name, address, contact, email);

    customer_array[selected_cus_index] = customer;
    deleteCookie("customerArray");
    setCookie("customerArray", JSON.stringify(customer_array), 7);
    getCookie("customerArray")
    loadCustomerArrayFromCookies()
    loadCustomerTable();
    $('#cusModal1').modal('hide');
});

$('.cus_Delete_button').on('click', function() {

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            customer_array.splice(selected_cus_index, 1);
            deleteCookie("customerArray");
            setCookie("customerArray", JSON.stringify(customer_array), 7);
            getCookie("customerArray");
            loadCustomerArrayFromCookies();
            loadCustomerTable();
            $('#cusModal1').modal('hide');
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });

    $('#clear').on('click', function () {
        $('#txtSearch').val("");
    });
});
