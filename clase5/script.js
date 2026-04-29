const product_form = document.querySelector("#productform");

let my_var;

product_form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    my_var = event;
    
    const { ID, Product, Price, Qty } = my_var.target;
    
    const form_values = {
        ID: ID.value,
        Product: Product.value,
        Price: Price.value,
        Qty: Qty.value
    };

    try {
        const response = await axios.post('TU_URL_AQUI', form_values);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
});

validation_form.addEventListener('submit', )