const form = document.getElementById('form');
const sprice = document.getElementById('sprice');
const pname = document.getElementById('pname');
const list = document.getElementById('list');
const totalsum= document.getElementById('totalsum'); 

let totalSum = 0; 

form.addEventListener('submit', AddProduct);

window.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/5a58f3866d18415c92d22a052514b80c/SellingData")
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) 
            {
                
                showData(response.data[i]);
                updateTotalSum(response.data[i].Sprice); 
            
            }
             displayTotalSum(); 
        })
        .catch((error) => {
            console.log(error);
        });
});

function AddProduct(e) {
    e.preventDefault();

    const Sprice = parseFloat(sprice.value);
    const Pname = pname.value;

    const data = {
        Sprice,
        Pname
    };

    axios.post("https://crudcrud.com/api/5a58f3866d18415c92d22a052514b80c/SellingData", data)
        .then((response) =>
         {
            showData(response.data);
            updateTotalSum(response.data.Sprice); 
            displayTotalSum(); 
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
}

function showData(data) {
    const listItem = document.createElement('li');

    listItem.innerHTML = `<strong>Selling Price:</strong>${data.Sprice},
                        <strong>Product Name:</strong>${data.Pname}`;

    
    const deletebtn = createbutton("DeleteProduct", () => DeleteData(data._id, listItem));
    listItem.appendChild(deletebtn);

    list.appendChild(listItem);
}

function createbutton(text, clickhandler) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickhandler);
    return button;
}

function DeleteData(id, listItem) {
    axios.delete(`https://crudcrud.com/api/5a58f3866d18415c92d22a052514b80c/SellingData/${id}`)
        .then((response) => {
            console.log(response);
            updateTotalSum(-parseFloat(listItem.textContent.match(/Selling Price:(.*?),/)[1])); 
            displayTotalSum(); 
            listItem.remove();
        })
        .catch((error) => {
            console.log(error);
        });
}

function updateTotalSum(price) {
    totalSum += price;
}

function displayTotalSum() {
    totalsum.innerHTML = `<strong>Total value worth of Products:</strong> ${totalSum.toFixed(2)}`; 
}
