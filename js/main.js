var productNameInput = document.getElementById("productNameInput"); //Input kolo f bn3ml .value 3shan nakhod el input value bs
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById(
  "productDescriptionInput"
);
var tableBody = document.getElementById("tableBody");
var productsContainer;

if (localStorage.getItem("productsLog") != null) {
  productsContainer = JSON.parse(localStorage.getItem("productsLog")); //pasre is function to return string to object format
  displayProducts(productsContainer);
} else {
  productsContainer = [];
}
function addProduct() {
  var productDetails = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
  };
  productsContainer.push(productDetails);
  localStorage.setItem("productsLog", JSON.stringify(productsContainer)); //stringify convert from obj form to string to store in local sotrage
  console.log(productsContainer);
  clearForm();
  displayProducts(productsContainer);
}

function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

// function displayProducts(productList) {
//   var tableRow = ``;
//   for (var i = 0; i < productList.length; i++) {
//     tableRow += `  <tr>
//               <td>${i + 1}</td>
//               <td>${productList[i].name}</td>
//               <td>${productList[i].price}</td>
//               <td>${productList[i].category}</td>
//               <td>${productList[i].description}</td>
//               <td><button class="btn btn-sm btn-warning text-light">Update</button></td>
//               <td><button class="btn btn-sm btn-danger text-light">Delete</button></td>
//             </tr>`;
//   }
//   tableBody.innerHTML = tableRow;
// }

function displayProducts(productList) {
  var tableRow = ``;
  for (var i = 0; i < productList.length; i++) {
    tableRow += `  <tr>
              <td>${i + 1}</td>
              <td>${productList[i].name}</td>
              <td>${productList[i].price}</td>
              <td>${productList[i].category}</td>
              <td>${productList[i].description}</td>
              <td><button class="btn btn-sm btn-warning text-light" onclick="updateProduct(${i})">Update</button></td>
              <td><button class="btn btn-sm btn-danger text-light" onclick="deleteProduct(${i})">Delete</button></td>
            </tr>`;
  }
  tableBody.innerHTML = tableRow;
}

// Update Product Function
function updateProduct(index) {
  // Pre-fill the form with the current product details
  productNameInput.value = productsContainer[index].name;
  productPriceInput.value = productsContainer[index].price;
  productCategoryInput.value = productsContainer[index].category;
  productDescriptionInput.value = productsContainer[index].description;

  // Change the add button to an update button
  var addButton = document.getElementById("addButton");
  addButton.textContent = "Update Product";
  addButton.onclick = function () {
    // Save the updated product
    productsContainer[index] = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      description: productDescriptionInput.value,
    };

    localStorage.setItem("productsLog", JSON.stringify(productsContainer)); // Save to localStorage
    displayProducts(productsContainer); // Update the table display
    clearForm(); // Clear the form
    addButton.textContent = "Add Product"; // Reset the button text
    addButton.onclick = addProduct; // Reset the onclick event to the original addProduct function
  };
}

// Delete Product Function
function deleteProduct(index) {
  // Confirm if the user wants to delete the product
  if (confirm("Are you sure you want to delete this product?")) {
    productsContainer.splice(index, 1); // Remove the product from the array
    localStorage.setItem("productsLog", JSON.stringify(productsContainer)); // Update localStorage
    displayProducts(productsContainer); // Refresh the displayed list
  }
}

function searchProducts(searchTerm) {
  var searchResult = [];
  for (var i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      searchResult.push(productsContainer[i]);
      displayProducts(searchResult);
    }
  }
}
