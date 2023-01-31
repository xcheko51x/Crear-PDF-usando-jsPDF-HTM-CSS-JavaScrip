const usuario = {
    id: '',
    nombre: '',
    email: '',
    puesto: ''
}

let isValido = false
let isEditando = false

function accionUsuario(event) {
    event.preventDefault()

    validarCampos()

    if(isValido) {
        if (!isEditando) {
            agregarUsuario()
        } else {
            editarUsuario()
        }

        limpiarObj()
        limpiarCampos()
    }
}

function agregarUsuario() {
    const id = new Date().getTime()

    const inpNombre = document.getElementById('input-nombre').value
    const inpEmail = document.getElementById('input-email').value
    const inpPuesto = document.getElementById('input-puesto').value

    const tBody = document.querySelector('tbody')
    const tr = document.createElement('tr')
    tr.setAttribute('id', id)
    
    const thId = document.createElement('th')
    thId.textContent = id
    const thNombre = document.createElement('th')
    thNombre.textContent = inpNombre
    const thEmail = document.createElement('th')
    thEmail.textContent = inpEmail
    const thPuesto = document.createElement('th')
    thPuesto.textContent = inpPuesto

    btnEditar = document.createElement('button')
    btnEditar.classList.add('btn', 'btn-editar')
    btnEditar.textContent = 'Editar'
    btnEditar.onclick = function() {
        isEditando = true

        usuario.id = thId.textContent
        usuario.nombre = thNombre.textContent
        usuario.email = thEmail.textContent
        usuario.puesto = thPuesto.textContent

        document.getElementById('input-nombre').value = usuario.nombre
        document.getElementById('input-email').value = usuario.email
        document.getElementById('input-puesto').value = usuario.puesto

        document.getElementById('btn-agregar-actualizar').value = 'Editar usuario'
        document.getElementById('btn-agregar-actualizar').classList.add('btn-editar')
        document.getElementById('btn-agregar-actualizar').classList.remove('btn-crear')
        
        
    }

    btnBorrar = document.createElement('button')
    btnBorrar.classList.add('btn', 'btn-borrar')
    btnBorrar.textContent = 'Borrar'
    btnBorrar.onclick = function() {
        tr.remove()
    }

    tr.appendChild(thId)
    tr.appendChild(thNombre)
    tr.appendChild(thEmail)
    tr.appendChild(thPuesto)
    tr.appendChild(btnEditar)
    tr.appendChild(btnBorrar)
    tBody.appendChild(tr)
}

function editarUsuario() {
    const trId = document.getElementById(usuario.id)

    trId.childNodes[1].textContent = document.getElementById("input-nombre").value
    trId.childNodes[2].textContent = document.getElementById("input-email").value
    trId.childNodes[3].textContent = document.getElementById("input-puesto").value

    const btnEditar = document.getElementById("btn-agregar-actualizar")
    btnEditar.value = "Crear Tarea"
    btnEditar.classList.remove('btn-editar')
    btnEditar.classList.add('btn-crear')
}

function limpiarObj() {
    usuario.id = ''
    usuario.nombre = ''
    usuario.email = ''
    usuario.puesto = ''
}

function limpiarCampos() {
    document.getElementById('input-nombre').value = ''
    document.getElementById('input-email').value = ''
    document.getElementById('input-puesto').value = ''

    isValido = false
    isEditando = false
}

function validarCampos() {
    
    const inpNombre = document.getElementById('input-nombre').value
    const inpEmail = document.getElementById('input-email').value
    const inpPuesto = document.getElementById('input-puesto').value

    if (
        inpNombre === '' ||
        inpEmail === '' ||
        inpPuesto === ''
    ) {
        alert('Se deben de llenar todos los campos.')
        isValido = false
    } else {
        isValido = true
    }
}

function generarPDF(event) {
    event.preventDefault()

    const tbody = document.querySelector('tbody')
    if(tbody.childElementCount === 0) {
        alert('No se puede crear el PDF ya que no existen registros en la tabla')
        return
    }
    
    const str = recorrerTabla()

    
    const doc = new jsPDF()
    doc.text(10, 10, str)
    doc.save('lista-usuarios.pdf')
}

function recorrerTabla() {
    let str = ''

    const table = document.getElementById('table-usuarios')

    for (let i = 0; i <= table.rows.length-1; i++) {
        str += '\n'
        for (let j = 0; j <= table.rows[i].cells.length-1; j++) {
            if(j == 0) {
                str += '* '
            } else {
                let col = table.rows[i].cells[j].innerText
                str += `-> ${col}`
            }    
        }
    }

    return str    
}