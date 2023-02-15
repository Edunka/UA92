// adds to cart
let carts = document.querySelectorAll('.add-cart');
// Product list Array
let products = [
    {
        id:'wu',
        name: 'WuTang Clan',
        tag: 'Enter the WU-Tang (36 chambers)',
        price:10,
        inCart:0

    },
    {   
        id:'big',
        name: 'The Notorious B.I.G',
        tag: 'Ready to Die',
        price: 5,
        inCart:0

    },
    {
        id:'nas',
        name:'NAS',
        tag:'Illmatic',
        price:8,
        inCart:0
    },
    {
        id:'cent',
        name:'50cent',
        tag:'Get Rich or Die Trying',
        price:12,
        inCart:0
    },
    {
        id:'dog',
        name:'Snoop Dogg',
        tag:'Doggystyle',
        price:9,
        inCart:0
    },
    {
        id:'tupac',
        name:'Tupac Shakur',
        tag:'All Eyez on Me',
        price:5,
        inCart:0
    }
]
// changes value of items in cart
for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () =>{
        setItems(products[i]);
        cartNumbers(products[i]);
    })
}

//keeps cart value same as selected, stores in local storage
function cartNumbers(){
    let products = JSON.parse(localStorage.getItem('productsInCart'));
    let totalProducts = 0;
    Object.values(products).map(item =>{
        totalProducts += item.inCart;
    })
    document.querySelector('.cart span').textContent = totalProducts;
}


// sends items selected to local storage
function setItems(product){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
//checks if there are already items in cart/increases/decreases number of items in cart
if(cartItems != null) {
    if(cartItems[product.tag] == undefined) {
        cartItems = {
            ...cartItems,
            [product.tag]: product
        }
    }
    cartItems[product.tag].inCart += 1; 
} else {
    product.inCart = 1;
    cartItems = {
        [product.tag]: product
    }
}
// sets items to string
localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function displayCart(){
    // gets products in local storage
    let cartItems = localStorage.getItem('productsInCart');
    // passes products in number
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products tbody');
    let totalCost = 0;
    //sets the value of the porduct tabel in cart to empty/edits the table in cart page and adds the html for products to show on the page
    let basketTotal = document.querySelector('.basketTotal');
    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            //let {id,name,tag,price,inCart} = item;
            totalCost += item.inCart * item.price;
            productContainer.innerHTML += `
            <tr>
            <th scope="row"><span class="bi bi-x-circle-fill"></span>` + item.name + `</th>
            <td>£` + item.price + `</td>

            <td class='buttons' id=` + item.id + `>
            <button onClick="changeQuantity('` + item.tag + `', 'minus')">-</button>
            <span>` + item.inCart + `</span>
            <button onClick="changeQuantity('` + item.tag + `', 'plus')">+</button>
            </td>
            <td class='totalCos'>£` + item.inCart * item.price  + `</td>
        </tr>`
            
        });
        // sets the total cost of the basket on the page in html
            basketTotal.innerHTML = `<h4>Basket Total:£` + totalCost + `</h4>`;
    }
    cartNumbers();
    return cartItems;
    
}
// changes the quantity of the products in the cart value/increase/decrease/deletes
function changeQuantity (tag, plusMinus){
    let products = JSON.parse(localStorage.getItem('productsInCart'));
    if (plusMinus === "minus") {
        if (products[tag].inCart > 1) {
            products[tag].inCart--;
        }
        else {
            delete products[tag];
        }
    }
    else if (plusMinus === "plus") {
        products[tag].inCart++;
    }
    localStorage.setItem('productsInCart', JSON.stringify(products));
    displayCart();
}
// calls the functions for displaying the cart items values in the nav bar and the cart page itself
cartNumbers();
displayCart();
