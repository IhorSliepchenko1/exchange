function checkLocalStorage() {
    const storedData = localStorage.getItem('exchangeData');
    if (storedData) {
        productsData = JSON.parse(storedData);
        renderData(productsData);
        renderoptionSelecFtrom(productsData);
    }
}
window.addEventListener('load', checkLocalStorage);