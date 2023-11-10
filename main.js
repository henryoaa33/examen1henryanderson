document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.needs-validation');
    var claveInput = document.querySelector('input[placeholder="Clave"]');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var nombre = form.querySelector('input[placeholder="Nombre"]').value.trim();
        var identidad = form.querySelector('input[placeholder="Identidad"]').value.trim();

        var validationMessage = validarDatos(nombre, identidad);

        if (validationMessage) {
            alert(validationMessage);
            if (!nombre) {
                form.querySelector('input[placeholder="Nombre"]').focus();
            } else {
                form.querySelector('input[placeholder="Identidad"]').focus();
            }
        } else {
            guardarRegistro(nombre, identidad);
        }
    });

    function validarDatos(nombre, identidad) {
        var nombreRegex = /^[a-zA-Z\s]+$/;
        if (!nombreRegex.test(nombre) || nombre.split(' ').length < 2) {
            return 'Error en el nombre. Solo se permiten letras y deben ser al menos 2 palabras.';
        }

        var identidadRegex = /^[0-1]\d{12}$/;
        if (!identidadRegex.test(identidad)) {
            return 'Error en la identidad. Solo se permiten números, debe tener 13 números y debe iniciar con 0 o 1.';
        }

        return null;
    }

    function guardarRegistro(nombre, identidad) {
        var fecha = new Date();
        var nuevoRegistro = [
            obtenerUltimoID() + 1,
            nombre,
            identidad,
            fecha.toLocaleDateString(),
            fecha.getHours(),
            fecha.getMinutes()
        ];

        var registros = JSON.parse(localStorage.getItem('registros')) || [];
        registros.push(nuevoRegistro);
        localStorage.setItem('registros', JSON.stringify(registros));

        console.log('Registros guardados:', registros);

        form.reset();
        mostrarRegistros();
    }

    function obtenerUltimoID() {
        var registros = JSON.parse(localStorage.getItem('registros')) || [];
        return registros.length === 0 ? 0 : registros[registros.length - 1][0];
    }

    function mostrarRegistros() {
        var registros = JSON.parse(localStorage.getItem('registros')) || [];
        var vehiculosList = document.querySelector('.list-group');
        vehiculosList.innerHTML = '';

        registros.forEach(function (registro) {
            var li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'lh-sm');

            var div = document.createElement('div');
            div.innerHTML = '<h6 class="my-0">' + registro[1] + '</h6><small class="text-muted">' + registro[2] + '</small>';
            li.appendChild(div);

            var span = document.createElement('span');
            span.classList.add('text-muted');
            span.textContent = registro[3] + ' ' + registro[4] + ':' + registro[5];
            li.appendChild(span);

            vehiculosList.appendChild(li);
        });
    }

    document.querySelector('button[data-bs-target="#exampleModal"]').addEventListener('click', function () {
        mostrarRegistros();
    });

    claveInput.addEventListener('keyup', function () {
        if (claveInput.value === 'PW12023') {
            var vehiculosList = document.querySelector('.list-group');
            vehiculosList.innerHTML = '';
        }
    });
    

    mostrarRegistros();
});