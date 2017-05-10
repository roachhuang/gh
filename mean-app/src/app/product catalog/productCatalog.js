/*
Populate the "List of All Products" table using the products obtained from the library.js functions.
To accomplish this, we need to first create a function called updateTable(tableId,productArray) that helps us populate the table. We also need to add a function called createTableHeader(tableId) that is used by updateTable(tableId,productArray) to create table headers.
*/
(function () {
    const DIFFERENCE = 50;

    function createTableHeader(tableId) {
        let tableHeaderRow = document.createElement('TR');
        let th1 = document.createElement('TH');
        let th2 = document.createElement('TH');
        let th3 = document.createElement('TH');
        let th4 = document.createElement('TH');
        th1.appendChild(document.createTextNode("ProductId"));
        th2.appendChild(document.createTextNode("Type"));
        th3.appendChild(document.createTextNode("Price"));
        th4.appendChild(document.createTextNode("Examine"));
        tableHeaderRow.appendChild(th1);
        tableHeaderRow.appendChild(th2);
        tableHeaderRow.appendChild(th3);
        tableHeaderRow.appendChild(th4);
        document.getElementById(tableId).appendChild(tableHeaderRow);
    }

    /*
    The updateTable(tableId,productArray) function references the table element in the HTML code using the tableId argument and dynamically adds rows to it. Each row will have a ProductId, Type, Price and Examine column. The ProductId, Type and Price cells are populated using the data in the productArray argument. The Examine section has an Examine button that has a click event handler that will be filled out later in this tutorial.
    */
    function updateTable(tableId, productArray) {
        let tableBody = document.getElementById(tableId);

        //reset table
        while (tableBody.hasChildNodes()) {
            tableBody.removeChild(tableBody.firstChild);
        }
        //create table header
        createTableHeader(tableId);
        //populate table rows
        for (i = 0; i < productArray.length; i++) {
            let tr = document.createElement('TR');
            let td1 = document.createElement('TD');
            let td2 = document.createElement('TD');
            let td3 = document.createElement('TD');
            let td4 = document.createElement('button');

            td4.addEventListener('click', function () {
                /*
                when an Examine button is pressed inside any of the tables' rows.
                */
                processSearchId(this.parentNode.firstChild.innerHTML);
            });
            td1.appendChild(document.createTextNode(productArray[i].id));
            td2.appendChild(document.createTextNode(productArray[i].type));
            td3.appendChild(document.createTextNode(productArray[i].price));
            td4.appendChild(document.createTextNode("Examine"));
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tableBody.appendChild(tr);
        }
    }
    /*
    The updateExaminedText(product) function edits the the HTML in the "Examined Product" section and fills it with the attributes of the product argument.
    */
    function updateExaminedText(product) {
        let outputString = "Product Id: " + product.id;
        outputString += "<br> Price: " + product.price;
        outputString += "<br> Type: " + product.type;
        document.getElementById("productText").innerHTML = outputString;
    }

    /*
    The getIntersection(arrA,arrB,searchedId) function will be used to get the intersection of the similarly priced and similarly typed arrays. The searchedId argument is used to exclude the examined product from the intersection because the original product should not show up in its own similar products list.
    */
    function getIntersection(arrA, arrB, searchedId) {

        let samePrice = arrA;
        let sameType = arrB;
        let similarArray = [];
        samePrice.forEach(function (obj1) {
            sameType.forEach(function (obj2) {
                if (obj1.id == obj2.id && obj1.id != searchedId)
                    similarArray.push(obj1);
            });
        });

        return similarArray;

    }

    /*
    The processSearch(searchId) function starts by using the api.searchProductById(searchId) library function to get a Promise containing the searched product. Once the Promise resolves, the promise then chains on an additional asynchronous operation by returning the Promise.all() method call. The Promise.all() method call is used to process three different values:

    a Promise returned by api.searchProductByPrice(val.price,50)
    a Promise returned by api.searchProductByType(val.type)
    the originally searched product represented by the val letiable
    The Promise.all() method call returns a Promise containing an array that has a list of similarly priced products, a list of similarly typed products and the originally searched product. The getIntersection() method call is used to get the intersection of the similarly priced and similarly typed products while omitting the originally searched product from the intersection results.
    Next, the "Examined Product" section is populated using the updateExaminedText() method with the originally searched product passed in as the argument.

    Next, the "List of Similar Products" table is populated using the updateTable() method with the similar table id and the intersection array passed in as arguments.

    Lastly, if an invalid id is searched, an error alert will appear.
    */

    function processSearchId(searchId) {
        api.searchProductsById(searchId).then(val=> {
            return Promise.all([api.searchProductsByPrice(val.price, DIFFERENCE), api.searchProductsByType(val.type), val]);
        }).then(val => {
            let similarArray = getIntersection(val[0], val[1], val[2].id);
            updateExaminedText(val[2]);
            updateTable('similarTable', similarArray);
        }).catch(val => {
            alert(val);
        });
    }

    // list a type of products and price within rang from a to b
    function processSearchType(searchType) {
        api.searchProductsByType(searchType).then(val=> {
            return Promise.all([api.searchProductsByPrice(100, DIFFERENCE), val]);
        }).then(val => {
            // coz no id = -1, so it won't exclude any id
            let similarArray = getIntersection(val[0], val[1], -1);
            updateExaminedText(val[1][0]);
            updateTable('similarTable', similarArray);
        }).catch(val => {
            alert(val);
        });
    }
    function processSearchPrice(searchPrice) {
        api.searchProductsByPrice(parseInt(searchPrice), DIFFERENCE).then(val=>{
            let similarArray = val;
            updateExaminedText(val[0]);
            updateTable('similarTable', similarArray);
        }).catch(val => {
            alert(val);
        });
    }
    document.getElementById("searchByIdBtn").addEventListener('click', function () {
        processSearchId(document.getElementById('idInput').value);
    });
      document.getElementById("searchByTypeBtn").addEventListener('click', function () {
        processSearchType(document.getElementById('typeInput').value);
    });
      document.getElementById("searchByPriceBtn").addEventListener('click', function () {
        processSearchPrice(document.getElementById('priceInput').value);
    });
    /*
    Next, we will use the library's api.searchAllProducts() method call to get a Promise containing an array of all of the products in the catalog. We will then use the updateTable(tableId,productArray) method to populate the "List of All Products" table with the array of catalog products.
    */
    api.searchAllProducts().then(value=> {
        updateTable('allTable', value);
    });

})();