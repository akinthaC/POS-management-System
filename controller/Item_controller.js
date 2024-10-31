import ItemModel from "../model/itemModel.js";

let item_array = [];
let selected_item_index;
const generateNextItemId =() =>{
    $('#itemCode').val(item_array.length+1)
    $('#itemName').val(null)
    $('#itemPrice').val(null)
    $('#itemQuantity').val(null)
}

const loadItemTable =() => {
    $('#ItemTableBody').empty();

    item_array.map((item, index) => {
        console.log(item)
        let data = `<tr> <td>${item.itemCode}</td> <td>${item.itemName}</td> <td>${item.price}</td> <td>${item.qty}</td></tr>`;

        $('#ItemTableBody').append(data);
        generateNextItemId()

    });
}

$('#ItemNew').on('click', function(){
    generateNextItemId()
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
        searchType = "itemName";
    } else if (searchType === "ID") {
        searchType = "itemCode";
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
                <td>${item.itemCode}</td>
                <td>${item.itemName}</td>
                <td>${item.price}</td>
                <td>${item.qty}</td>
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

    $('#itemCode1').val(item_row.itemCode);
    $('#itemName1').val(item_row.itemName);
    $('#itemPrice1').val(item_row.price);
    $('#itemQuantity1').val(item_row.qty);

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
    loadItemTable();
});

$('.delete_Item_Button').on('click', function() {
    item_array.splice(selected_item_index, 1);
    loadItemTable()
    $('#itemModal1').modal('hide');
});