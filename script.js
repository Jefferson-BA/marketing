document.addEventListener('DOMContentLoaded', () => {
    const editableElements = document.querySelectorAll('[contenteditable="true"]');

    // 1. CARGAR DATOS GUARDADOS (Auto-guardado)
    editableElements.forEach((element, index) => {
        const savedData = localStorage.getItem(`cjm_cell_${index}`);
        if (savedData !== null) {
            element.innerHTML = savedData;
        }

        element.addEventListener('input', () => {
            localStorage.setItem(`cjm_cell_${index}`, element.innerHTML);
        });
    });

    // 2. DESCARGAR COMO IMAGEN
    const saveImgBtn = document.getElementById('save-img-btn');
    if (saveImgBtn) {
        saveImgBtn.addEventListener('click', () => {
            const captureArea = document.getElementById('capture-area');
            
            // html2canvas toma una "foto" del elemento div
            html2canvas(captureArea, { scale: 2, backgroundColor: '#ffffff' }).then(canvas => {
                const link = document.createElement('a');
                link.download = 'Customer_Journey_Map.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        });
    }

    // 3. GUARDAR COMO PDF
    const savePdfBtn = document.getElementById('save-pdf-btn');
    if (savePdfBtn) {
        savePdfBtn.addEventListener('click', () => {
            // Llama a la ventana de impresión nativa (configurada en CSS para ser apaisada)
            window.print();
        });
    }

    // 4. LIMPIAR MAPA
    const clearButton = document.getElementById('clear-btn');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres borrar todo el contenido del mapa?')) {
                localStorage.clear();
                window.location.reload(); 
            }
        });
    }
});