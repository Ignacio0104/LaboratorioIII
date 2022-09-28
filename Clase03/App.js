//Array original
let arrayJson= JSON.parse('[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "titulo":"Ingeniero", "facultad":"UTN", "anoGraduacion":2002},{"id":2, "nombre":"Ramiro", "apellido":"Escobar", "edad":35, "titulo":"Medico", "facultad":"UBA", "anoGraduacion":2012},{"id":3, "nombre":"Facundo", "apellido":"Cairo", "edad":30, "titulo":"Abogado", "facultad":"UCA", "anoGraduacion":2017},{"id":4, "nombre":"Fernando", "apellido":"Nieto", "edad":18, "equipo":"Independiente", "posicion":"Delantero", "cantidadGoles":7},{"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20, "equipo":"Racing", "posicion":"Volante", "cantidadGoles":2},{"id":6, "nombre":"Nicolas", "apellido":"Serrano", "edad":23, "equipo":"Boca", "posicion":"Arquero", "cantidadGoles":0}]');
let arrayPersonas=[];

//Variables
let formularioVisible=true;

//Selectores
let body = document.querySelector("body");
let checkBoxList = document.querySelectorAll('input[type=checkbox]');
let comboBox = document.getElementById("select_filtro");
let tablaInformacion = document.getElementById("tabla");
let botonCalculo = document.getElementById("calcular_btn");
let botonAgregar = document.getElementById("agregar_btn");
let comboBoxAlta = document.getElementById("select_tipo");
let botonAlta = document.getElementById("alta_btn");
let botonModificar = document.getElementById("modificar_btn");
let botonEliminar = document.getElementById("eliminar_btn");
let botonCancelar = document.getElementById("cancelar_btn");

//Asignacion de listeners
window.addEventListener("load",CargaInformacionJSON);
window.addEventListener("load",CargarTablas);
comboBox.addEventListener("change",CargarTablas)
comboBoxAlta.addEventListener("change",OcultarCampos)
checkBoxList.forEach(element => {
    element.addEventListener("change",FiltrarColumnas);
});
botonCalculo.addEventListener("click",CalcularEdadPromedio);
botonAgregar.addEventListener("click",MostrarOcultarForm);
botonAlta.addEventListener("click",AltaModificacion);
botonModificar.addEventListener("click",AltaModificacion);
botonEliminar.addEventListener("click",EliminarRegistro)

//Métodos automaticos
function CargaInformacionJSON()
{
    arrayJson.forEach(element => {
        if(element.hasOwnProperty("equipo"))
        {
            jugadorNuevo = new Futbolista(element["id"],element["nombre"],element["apellido"],element["edad"],element["equipo"],element["posicion"],element["cantidadGoles"])
            arrayPersonas.push(jugadorNuevo);
        }else{
            profesionalNuevo = new Profesional(element["id"],element["nombre"],element["apellido"],element["edad"],element["titulo"],element["facultad"],element["anoGraduacion"]);
            arrayPersonas.push(profesionalNuevo);
        }
    });
    FiltrarColumnas();
    MostrarOcultarForm();
}

//ABM

function ValidarCampos(id,nombre,apellido,edad,equipo,posicion,goles,titulo,facultad,graduacion)
{
    if(id==""||isNaN(id)){
        alert("Revisar el ID");
        return false;
    }
    if(nombre==""||!isNaN(nombre)){
        alert("Revisar el nombre");
        return false;
    }
    if(apellido==""||!isNaN(apellido)){
        alert("Revisar el apellido");
        return false;
    }
    if(edad==""||edad<15||isNaN(edad)){
        alert("Revisar la edad");
        return false;
    }
    if(comboBoxAlta.value == "futbolistas")
    {
        if(equipo==""||!isNaN(equipo)){
            alert("Revisar el equipo");
            return false;
        }
        if(posicion==""||!isNaN(posicion)){
            alert("Revisar la posicion");
            return false;
        }
        if(goles==""||goles<0||isNaN(goles)){
            alert("Revisar los goles");
            return false;
        }    
    }else
    {
        if(titulo==""||!isNaN(titulo)){
            alert("Revisar el titulo");
            return false;
        }
        if(facultad==""||!isNaN(facultad)){
            alert("Revisar la facultad");
            return false;
        }
        if(graduacion==""||graduacion<1950||isNaN(graduacion)){
            alert("Revisar el año de graduación");
            return false;
        }
    }
    alert ("Cambio guardado con éxito");
   return true;
}

function EncontrarUltimoId()
{
    let ultimoId=0;
    arrayPersonas.forEach(element => {
        if(element.id>ultimoId)
        {
            ultimoId=element.id;
        }
    });

    return ultimoId;
}

function EliminarRegistro()
{
    let id = document.getElementById("input_id").value;
    let indice;
    for (let index = 0; index < arrayPersonas.length; index++) {
        if(arrayPersonas[index].id == id)
        {
            indice = index;
            break;
        }  
    }
    arrayPersonas.splice(indice,1);
    alert("Elemento eliminado");
    MostrarOcultarForm();
}

function AltaModificacion()
{
    let id = document.getElementById("input_id").value;
    let nombre = document.getElementById("input_nombre").value;
    let apellido = document.getElementById("input_apellido").value;
    let edad = document.getElementById("input_edad").value;
    let equipo = document.getElementById("input_equipo").value;
    let posicion = document.getElementById("input_posicion").value;
    let goles = document.getElementById("input_cantidadGoles").value;
    let titulo = document.getElementById("input_titulo").value;
    let facultad = document.getElementById("input_facultad").value;
    let graduacion = document.getElementById("input_anoGraduacion").value;
    
    if(ValidarCampos(EncontrarUltimoId()+1,nombre,apellido,edad,equipo,posicion,goles,titulo,facultad,graduacion))
    {
        if(comboBoxAlta.value == "futbolistas")
        {
            if(id=="")
            {
                futbolistaAux = new Futbolista(EncontrarUltimoId()+1,nombre,apellido,edad,equipo,posicion,goles);
                arrayPersonas.push(futbolistaAux);
            }else{
                let futbolistoModificar = arrayPersonas.filter(element=>element.id==id);
                futbolistoModificar[0].ActualizarDatos(nombre,apellido,edad,equipo,posicion,goles);
            }
        }else
        {
            if(id=="")
            {            
                profesionalAux = new Profesional(EncontrarUltimoId()+1,nombre,apellido,edad,titulo,facultad,graduacion);
                arrayPersonas.push(profesionalAux);
            }else{
                let profesionalModificar = arrayPersonas.filter(element=>{ if(element.id==id) return element});
                profesionalModificar[0].ActualizarDatos(nombre,apellido,edad,titulo,facultad,graduacion);
            }
        }
    }
}

function CargarTablas()
{
    tablaInformacion.innerHTML=""; 
    FiltrarColumnas()
    CargarTitulos();
    arrayFiltrado = arrayPersonas.filter(element => FiltrarPorComboBox(element));
    arrayFiltrado.map(element=>CrearRegistros(element));  
}

function AbrirFormModificacion(e)
{
    let fila = e.currentTarget;
    if(fila.cells[4].innerText=="-------")
    {
        comboBoxAlta.value="profesionales";
    }else{
        comboBoxAlta.value="futbolistas";
    }
    MostrarOcultarForm()
    document.getElementById("input_id").value= fila.cells[0].innerText;
    document.getElementById("input_nombre").value =fila.cells[1].innerText;
    document.getElementById("input_apellido").value =fila.cells[2].innerText;
    document.getElementById("input_edad").value=fila.cells[3].innerText;
    document.getElementById("input_equipo").value=fila.cells[4].innerText;
    document.getElementById("input_posicion").value=fila.cells[5].innerText;
    document.getElementById("input_cantidadGoles").value=fila.cells[6].innerText;
    document.getElementById("input_titulo").value=fila.cells[7].innerText;
    document.getElementById("input_facultad").value=fila.cells[8].innerText;
    document.getElementById("input_anoGraduacion").value=fila.cells[9].innerText;
    botonAlta.style.display="none";
    botonCancelar.style.display="none";
    botonModificar.style.display="inherit";
    botonEliminar.style.display="inherit";
}

function CrearRegistros(element)
{
    let filaTabla = document.createElement("tr");
    let celdaId = document.createElement("td");
    let celdaNombre= document.createElement("td");
    let celdaApellido = document.createElement("td");
    let celdaEdad = document.createElement("td");
    let celdadEquipo = document.createElement("td");
    let celdaPosicion =document.createElement("td");
    let celdaGoles = document.createElement("td");
    let celdaTitulo = document.createElement("td");
    let celdaFacultad = document.createElement("td");
    let celdaGraduacion = document.createElement("td");
    filaTabla.appendChild(celdaId);
    filaTabla.appendChild(celdaNombre);
    filaTabla.appendChild(celdaApellido);
    filaTabla.appendChild(celdaEdad);
    filaTabla.appendChild(celdadEquipo);
    filaTabla.appendChild(celdaPosicion);
    filaTabla.appendChild(celdaGoles);
    filaTabla.appendChild(celdaTitulo);
    filaTabla.appendChild(celdaFacultad);
    filaTabla.appendChild(celdaGraduacion);
    filaTabla.addEventListener("dblclick",AbrirFormModificacion);
    
    celdaId.innerText=element.id;
    celdaNombre.innerText=element.nombre;   
    celdaApellido.innerText=element.apellido;   
    celdaEdad.innerText=element.edad;
    celdadEquipo.innerText= element instanceof Futbolista ? element.equipo : "-------";   
    celdaPosicion.innerText=element instanceof Futbolista? element.posicion : "-------";   
    celdaGoles.innerText=element instanceof Futbolista ? element.cantidadGoles : "-------"   
    celdaTitulo.innerText= element instanceof Profesional ? element.titulo : "-------"   
    celdaFacultad.innerText=element instanceof Profesional ? element.facultad : "-------"   
    celdaGraduacion.innerText=element instanceof Profesional ? element.anoGraduacion : "-------"

    celdaId.classList.add("id");
    celdaNombre.classList.add("nombre");
    celdaApellido.classList.add("apellido");
    celdaEdad.classList.add("edad");
    celdadEquipo.classList.add("equipo");
    celdaPosicion.classList.add("posicion");
    celdaGoles.classList.add("goles");
    celdaTitulo.classList.add("titulo");
    celdaFacultad.classList.add("facultad");
    celdaGraduacion.classList.add("ano_graduacion");
    
    tablaInformacion.appendChild(filaTabla);
}


function CargarTitulos()
{
    let filaTitulos = document.createElement("tr");
    let celdaId = document.createElement("th");
    let celdaNombre= document.createElement("th");
    let celdaApellido = document.createElement("th");
    let celdaEdad = document.createElement("th");
    let celdadEquipo = document.createElement("th");
    let celdaPosicion =document.createElement("th");
    let celdaGoles = document.createElement("th");
    let celdaTitulo = document.createElement("th");
    let celdaFacultad = document.createElement("th");
    let celdaGraduacion = document.createElement("th");

    filaTitulos.appendChild(celdaId);
    filaTitulos.appendChild(celdaNombre);
    filaTitulos.appendChild(celdaApellido);
    filaTitulos.appendChild(celdaEdad);
    filaTitulos.appendChild(celdadEquipo);
    filaTitulos.appendChild(celdaPosicion);
    filaTitulos.appendChild(celdaGoles);
    filaTitulos.appendChild(celdaTitulo);
    filaTitulos.appendChild(celdaFacultad);
    filaTitulos.appendChild(celdaGraduacion);

    celdaId.classList.add("id");
    celdaNombre.classList.add("nombre");
    celdaApellido.classList.add("apellido");
    celdaEdad.classList.add("edad");
    celdadEquipo.classList.add("equipo");
    celdaPosicion.classList.add("posicion");
    celdaGoles.classList.add("goles");
    celdaTitulo.classList.add("titulo");
    celdaFacultad.classList.add("facultad");
    celdaGraduacion.classList.add("ano_graduacion");

    celdaId.innerText="ID";
    celdaNombre.innerText="Nombre";
    celdaApellido.innerText="Apellido";
    celdaEdad.innerText="Edad";
    celdadEquipo.innerText="Equipo";
    celdaPosicion.innerText="Posicion";
    celdaGoles.innerText="Cant Goles";
    celdaTitulo.innerText="Titulo";
    celdaFacultad.innerText="Facultad";
    celdaGraduacion.innerText="Año Graduación";

    tablaInformacion.appendChild(filaTitulos);
    let titulosColumnas = document.querySelectorAll('th');
    titulosColumnas.forEach(element => {
    element.addEventListener("click",OrdernarColumnas);
    });
}

//Calculos
function CalcularEdadPromedio()
{
    let acumulador=0;
    arrayPersonas.map(element=>
        {
            acumulador += element.edad;
        })
    document.getElementById("textbox_calculo").value= acumulador/arrayPersonas.length;   
}

//Ordenamiento
function OrdernarColumnas(e)
{
    let criterio = e.currentTarget.innerText;
    criterio=criterio.toLowerCase();
    if(criterio.includes("goles"))
    {
        criterio="cantidadGoles";
    }
    if(criterio.includes("graduaci"))
    {
        criterio="anoGraduacion";
    }
    
    switch (criterio) {
    case "id":
        arrayPersonas = arrayPersonas.sort((a, b) => a.id - b.id);
        break;
    case "nombre":
        arrayPersonas = arrayPersonas.sort((a,b) => (a.nombre> b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
        break;
    case "apellido":
        arrayPersonas = arrayPersonas.sort((a, b) => (a.apellido> b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0))
        break;
    case "edad":
        arrayPersonas = arrayPersonas.sort((a, b) => a.edad - b.edad);
        break; 
    case "equipo":
        arrayPersonas = arrayPersonas.sort((a, b) => (a.equipo> b.equipo) ? 1 : ((b.equipo > a.equipo) ? -1 : 0))
        break;
    case "posicion":
        arrayPersonas = arrayPersonas.sort((a, b) => (a.posicion> b.posicion) ? 1 : ((b.posicion > a.posicion) ? -1 : 0))
        break;
    case "cantidadGoles":
        arrayPersonas = arrayPersonas.sort((a,b)=>a.cantidadGoles-b.cantidadGoles);
        break;
    case "titulo":
        arrayPersonas = arrayPersonas.sort((a, b) => (a.titulo> b.titulo) ? 1 : ((b.titulo > a.titulo) ? -1 : 0))
        break;
    case "facultad":
        arrayPersonas = arrayPersonas.sort((a, b) => (a.facultad> b.facultad) ? 1 : ((b.facultad > a.facultad) ? -1 : 0))
        break;
    case "anoGraduacion":
        arrayPersonas = arrayPersonas.sort((a,b)=>a.anoGraduacion-b.anoGraduacion);
        break;                                 
    }
    CargarTablas();
}


//Filtros
function FiltrarPorComboBox(element){
    switch(comboBox.value){
        case "todos":
            return true;
        case "futbolistas":
            return(element instanceof(Futbolista))
        case "profesionales":
            return(element instanceof(Profesional))
    }
}

function FiltrarColumnas()
{
    document.querySelectorAll(".id").forEach(a=>a.style.display = "none");
    document.querySelectorAll(".nombre").forEach(a=>a.style.display = "none");
    document.querySelectorAll(".apellido").forEach(a=>a.style.display = "none");
    document.querySelectorAll(".edad").forEach(a=>a.style.display = "none");
    document.querySelectorAll(".equipo").forEach(a=>a.style.display = "none");
    document.querySelectorAll(".posicion").forEach(a=>a.style.display = "none");
    document.querySelectorAll(".goles").forEach(a=>a.style.display = "none");
    document.querySelectorAll(".titulo").forEach(a=>a.style.display = "none");
    document.querySelectorAll(".facultad").forEach(a=>a.style.display = "none");
    document.querySelectorAll(".ano_graduacion").forEach(a=>a.style.display = "none");
    let checkBoxChecked = document.querySelectorAll('input[type=checkbox]:checked');
    checkBoxChecked.forEach(element => {
        if(element.value == "id")
            document.querySelectorAll(".id").forEach(a=>a.style.display = "inline-block");
        if(element.value == "nombre")
            document.querySelectorAll(".nombre").forEach(a=>a.style.display = "inline-block");
        if(element.value == "apellido")
            document.querySelectorAll(".apellido").forEach(a=>a.style.display = "inline-block");
        if(element.value == "edad")
            document.querySelectorAll(".edad").forEach(a=>a.style.display = "inline-block");
        if(element.value == "equipo")
            document.querySelectorAll(".equipo").forEach(a=>a.style.display = "inline-block");
        if(element.value == "posicion")
            document.querySelectorAll(".posicion").forEach(a=>a.style.display = "inline-block");
        if(element.value == "cantGoles")
            document.querySelectorAll(".goles").forEach(a=>a.style.display = "inline-block");
        if(element.value == "titulo")
            document.querySelectorAll(".titulo").forEach(a=>a.style.display = "inline-block");
        if(element.value == "facultad")
            document.querySelectorAll(".facultad").forEach(a=>a.style.display = "inline-block");
        if(element.value == "anoGraduado")
            document.querySelectorAll(".ano_graduacion").forEach(a=>a.style.display = "inline-block");
    });
}

//Mostrar Ocultar

function MostrarOcultarForm()
{
    if(formularioVisible)
    {
        document.querySelector(".container_formulario").style.display="none";
        document.querySelector(".container_tabla").style.display="block";
        botonAgregar.innerText = "Agregar";
        document.getElementById("formularioAlta").reset();
        CargarTablas();
        formularioVisible=false;
    }else{
        OcultarCampos()
        document.querySelector(".container_formulario").style.display="block";
        document.querySelector(".container_tabla").style.display="block";
        botonAgregar.innerText = "Ocultar";
        formularioVisible=true;
        botonAlta.style.display="inherit";
        botonCancelar.style.display="none";
        botonEliminar.style.display="none";
        botonModificar.style.display="none";
    }
}

function OcultarCampos()
{
    switch(comboBoxAlta.value){
        case "futbolistas":
            document.querySelector(".input_alta_futbolista").style.visibility = "hidden";
            document.querySelector(".input_alta_profesional").style.visibility = "visible";
            break;
        case "profesionales":
            document.querySelector(".input_alta_futbolista").style.visibility = "visible";
            document.querySelector(".input_alta_profesional").style.visibility = "hidden";
            break;
    }
}

//Clases

class Persona{
    id;
    nombre;
    apellido;
    edad;
    
    constructor (id,nombre,apellido,edad)
    {
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
    }

    toString() {
            return `ID: ${this.id} - Nombre: ${this.nombre} - Apellido: ${this.apellido} - Edad ${this.edad}\n `;
    }
   
}


class Futbolista extends Persona{
    
    equipo;
    posicion;
    cantidadGoles;

    constructor(id,nombre,apellido,edad,equipo,posicion,cantidadGoles)
    {
        super(id,nombre,apellido,edad);
        this.equipo=equipo;
        this.posicion=posicion;
        this.cantidadGoles=cantidadGoles;
    }

    toString()
    {
        return `${super.toString()}Equipo: ${this.equipo} - Posicion ${this.posicion} - Goles ${this.cantidadGoles}`;
    }

    ActualizarDatos(nombre,apellido,edad,equipo,posicion,cantidadGoles)
    {
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
        this.equipo=equipo;
        this.posicion=posicion;
        this.cantidadGoles=cantidadGoles;
    }
}


class Profesional extends Persona{

    titulo;
    facultad;
    anoGraduacion;
    constructor(id,nombre,apellido,edad,titulo,facultad,anoGraduacion)
    {
        super(id,nombre,apellido,edad);
        this.titulo=titulo;
        this.facultad = facultad;
        this.anoGraduacion =anoGraduacion;
    }

    toString()
    {
        return `${super.toString()}Titulo: ${this.titulo} - Facultad ${this.facultad} - Año de graduación ${this.anoGraduacion}`;
    }

    ActualizarDatos(nombre,apellido,edad,facultad,titulo,anoGraduacion)
    {
        this.nombre=nombre;
        this.apellido=apellido;
        this.edad=edad;
        this.titulo=titulo;
        this.facultad = facultad;
        this.anoGraduacion =anoGraduacion;
    }
}