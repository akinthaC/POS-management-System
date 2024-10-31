/*Customer*/
import CustomerModel from "../model/customerModel.js";

let customer_array = [];
let selected_cus_index;

// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

function initialize() {
    const customerData = getCookie("customerArray");
    if (customerData) {
        customer_array = JSON.parse(customerData); // Load cookie data into customer_array
        console.log("Customer data loaded successfully.");
        loadCustomerTable();
    } else {
        console.log("No customer data found in cookies.");
    }
}

// Function to delete a cookie by name
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Function to generate the next customer ID and clear form fields
const generateNextCusId = () => {
    $('#cusId').val(customer_array.length + 1);
    $('#cusName, #cusAddress, #cusContact, #cusEmail').val(null);
}

// Load customer data into the table
const loadCustomerTable = () => {
    $('#customerTableBody').empty();
    customer_array.forEach((item, index) => {
        let cusData = `<tr> 
            <td>${item.cus_id}</td> 
            <td>${item.cus_name}</td> 
            <td>${item.address}</td> 
            <td>${item.contact}</td> 
            <td>${item.email}</td>
        </tr>`;
        $('#customerTableBody').append(cusData);
    });
    generateNextCusId();
}

/*initialize();*/

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

    customer_array.push(customer);
    deleteCookie("customerArray");
    setCookie("customerArray", JSON.stringify(customer_array), 7);
    loadCustomerTable();
});

// Customer Search
$('#cusSearch').on('click', function() {
    let searchType = $('#cusSearchByDropDown').val();
    let searchValue = $('#txtSearch').val().trim();

    // Map searchType to actual customer object properties
    if (searchType === "Name") {
        searchType = "cus_name";
    } else if (searchType === "ID") {
        searchType = "cus_Id";
    } else if (searchType === "Contact") {
        searchType = "contact";
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
                <td>${customer.cus_Id}</td>
                <td>${customer.cus_name}</td>
                <td>${customer.address}</td>
                <td>${customer.contact}</td>
                <td>${customer.email}</td>
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

    $('#cusId1').val(customer_row.cus_Id);
    $('#cusName1').val(customer_row.cus_name);
    $('#cusAddress1').val(customer_row.address);
    $('#cusContact1').val(customer_row.contact);
    $('#cusEmail1').val(customer_row.email);
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
    loadCustomerTable();
    $('#cusModal1').modal('hide');
});

$('.cus_Delete_button').on('click', function() {
    if (selected_cus_index !== undefined) {
        customer_array.splice(selected_cus_index, 1);
        deleteCookie("customerArray");
        setCookie("customerArray", JSON.stringify(customer_array), 7);
        loadCustomerTable();
        $('#cusModal1').modal('hide');
    } else {
        console.log("No customer selected for deletion.");
    }
});

$('#clear').on('click', function() {
    $('#txtSearch').val("");
});
