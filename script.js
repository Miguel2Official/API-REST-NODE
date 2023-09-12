document.addEventListener("DOMContentLoaded", function () {
    // Obtener una referencia al elemento tbody donde mostraremos la lista de empleados.
    const empleadosList = document.getElementById("empleados-list");

    // Obtener una referencia al formulario de agregar empleado.
    const addEmpleadoForm = document.getElementById("add-empleado-form");

    // Cargar la lista de empleados al cargar la página.
    fetch("/api/empleados")
        .then((response) => response.json())
        .then((data) => {
            // Recorrer la lista de empleados y agregar filas a la tabla.
            data.forEach((empleado) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${empleado.id}</td>
                    <td>${empleado.nombre}</td>
                    <td>${empleado.cedula}</td>
                    <td>${empleado.edad}</td>
                    <td>${empleado.telefono}</td>
                    <td>${empleado.eps}</td>
                    <td>
                        <button onclick="eliminarEmpleado(${empleado.id})">Eliminar</button>
                    </td>
                `;
                empleadosList.appendChild(row);
            });
        });

    // Agregar un evento de envío al formulario de agregar empleado.
    addEmpleadoForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Obtener los valores del formulario.
        const nombre = document.getElementById("nombre").value;
        const cedula = document.getElementById("cedula").value;
        const edad = parseInt(document.getElementById("edad").value);
        const telefono = document.getElementById("telefono").value;
        const eps = document.getElementById("eps").value;

        // Enviar una solicitud POST al backend para agregar un nuevo empleado.
        fetch("/api/empleados", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre,
                cedula,
                edad,
                telefono,
                eps,
            }),
        })
            .then((response) => response.json())
            .then((empleado) => {
                // Agregar el nuevo empleado a la tabla.
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${empleado.id}</td>
                    <td>${empleado.nombre}</td>
                    <td>${empleado.cedula}</td>
                    <td>${empleado.edad}</td>
                    <td>${empleado.telefono}</td>
                    <td>${empleado.eps}</td>
                    <td>
                        <button onclick="eliminarEmpleado(${empleado.id})">Eliminar</button>
                    </td>
                `;
                empleadosList.appendChild(row);

                // Limpiar el formulario después de agregar el empleado.
                addEmpleadoForm.reset();
            });
    });

    // Función para eliminar un empleado.
    function eliminarEmpleado(id) {
        fetch(`/api/empleados/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.status === 204) {
                    // Eliminar la fila de la tabla si la eliminación fue exitosa.
                    const row = document.querySelector(`tr td:first-child:contains("${id}")`).parentNode;
                    row.parentNode.removeChild(row);
                }
            });
    }
});
