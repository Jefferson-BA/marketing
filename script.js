document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los elementos editables en pantalla
    const editableElements = document.querySelectorAll('[contenteditable="true"]');

    // 1. CARGAR DATOS GUARDADOS PREVIAMENTE
    editableElements.forEach((element, index) => {
        const savedData = localStorage.getItem(`cjm_cell_${index}`);
        if (savedData !== null) {
            element.innerHTML = savedData;
        }

        // 2. ESCUCHAR CAMBIOS Y GUARDAR AUTOMÁTICAMENTE
        element.addEventListener('input', () => {
            localStorage.setItem(`cjm_cell_${index}`, element.innerHTML);
        });
    });

    // 3. BOTÓN PARA LIMPIAR TODO EL MAPA DE UNA VEZ
    const clearButton = document.getElementById('clear-btn');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres borrar todo el contenido del mapa?')) {
                localStorage.clear();
                window.location.reload(); // Recarga la página para restaurar valores iniciales
            }
        });
    }
});