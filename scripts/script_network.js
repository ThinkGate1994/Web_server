const dynamicRadio = document.getElementById('dynamic');
const staticRadio = document.getElementById('static');
const staticFields = document.querySelectorAll('.static-config');

dynamicRadio.addEventListener('change', () => {
    staticFields.forEach(field => {
        field.style.display = 'none';
    });
});

staticRadio.addEventListener('change', () => {
    staticFields.forEach(field => {
        field.style.display = 'block';
    });
});