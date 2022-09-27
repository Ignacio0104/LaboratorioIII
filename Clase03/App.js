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

//Asignacion de listeners
window.addEventListener("load",CargaInformacionJSON);
window.addEventListener("load",CargarTablas);
comboBox.addEventListener("change",CargarTablas)
checkBoxList.forEach(element => {
    element.addEventListener("change",FiltrarColumnas);
});
botonCalculo.addEventListener("click",CalcularEdadPromedio);
botonAgregar.addEventListener("click",MostrarOcultarForm);

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

function MostrarOcultarForm()
{
    if(formularioVisible)
    {
        document.querySelector(".container_formulario").style.display="none";
        document.querySelector(".container_tabla").style.display="block";
        botonAgregar.innerText = "Agregar";
        formularioVisible=false;
    }else{
        document.querySelector(".container_formulario").style.display="block";
        document.querySelector(".container_tabla").style.display="none";
        botonAgregar.innerText = "Ocultar";
        formularioVisible=true;
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

function CalcularEdadPromedio()
{
    let acumulador=0;
    arrayPersonas.map(element=>
        {
            acumulador += element.edad;
        })
    document.getElementById("textbox_calculo").value= acumulador/arrayPersonas.length;   
}


function CargarTablas()
{
    tablaInformacion.innerHTML=""; 
    FiltrarColumnas()
    CargarTitulos();
    arrayFiltrado = arrayPersonas.filter(element => FiltrarPorComboBox(element));
    arrayFiltrado.map(element=>CrearRegistros(element));  
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
    celdaGoles.innerText="Goles";
    celdaTitulo.innerText="Titulo";
    celdaFacultad.innerText="Facultad";
    celdaGraduacion.innerText="Año Graduación";

    tablaInformacion.appendChild(filaTitulos);
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
}