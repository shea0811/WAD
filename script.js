// script.js
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const productCode = params.get('productCode');

    fetch('WADCA1.xml') // Ensure the path to your XML file is correct
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, "application/xml");
            const product = xml.querySelector(`product[code="${productCode}"]`);
            
            if (product) {
                displayProductDetails(product);
            } else {
                document.body.innerHTML = "<p>Product not found.</p>";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.body.innerHTML = "<p>Error fetching product data.</p>";
        });
};

function displayProductDetails(product) {
    const detailsDiv = document.createElement('div');
    detailsDiv.innerHTML = `<h1>${product.getAttribute('name')}</h1><p>${product.textContent.trim()}</p>`;
    document.body.appendChild(detailsDiv);
}
