//Array original
let arrayJson= JSON.parse('[{"id":1, "nombre":"Marcelo", "apellido":"Luque", "edad":45, "titulo":"Ingeniero", "facultad":"UTN", "anoGraduacion":2002},{"id":2, "nombre":"Ramiro", "apellido":"Escobar", "edad":35, "titulo":"Medico", "facultad":"UBA", "anoGraduacion":2012},{"id":3, "nombre":"Facundo", "apellido":"Cairo", "edad":30, "titulo":"Abogado", "facultad":"UCA", "anoGraduacion":2017},{"id":4, "nombre":"Fernando", "apellido":"Nieto", "edad":18, "equipo":"Independiente", "posicion":"Delantero", "cantidadGoles":7},{"id":5, "nombre":"Manuel", "apellido":"Loza", "edad":20, "equipo":"Racing", "posicion":"Volante", "cantidadGoles":2},{"id":6, "nombre":"Nicolas", "apellido":"Serrano", "edad":23, "equipo":"Boca", "posicion":"Arquero", "cantidadGoles":0}]');
let arrayJugadores=[];
let arrayProfesionales=[];

//Selectores
let body = document.querySelector("body");
let checkBoxList = document.querySelectorAll('input[type=checkbox]');

//Asignacion de listeners
//window.addEventListener("load",CargaInformacionJSON);
window.addEventListener("load",CargarTablas);

function CargaInformacionJSON()
{
    arrayJson.forEach(element => {
        if(element.hasOwnProperty("equipo"))
        {
            jugadorNuevo = new Futbolista(element["id"],element["nombre"],element["apellido"],element["edad"],element["equipo"],element["posicion"],element["cantidadGoles"])
            arrayJugadores.push(jugadorNuevo);
        }else{
            profesionalNuevo = new Profesional(element["id"],element["nombre"],element["apellido"],element["edad"],element["titulo"],element["facultad"],element["añoGraduacion"]);
            arrayProfesionales.push(profesionalNuevo);
        }
    });
}

function ValidarJugador(element)
{
    if(element.hasOwnProperty("equipo"))
    {
        return true;
    }
    return false;
}

function FiltrarColumnas()
{
    checkBoxList.forEach(element => {
        if(element.checked)
        {
            console.log(element.value);
        }
    });
}

function CargarTablas()
{
    arrayJson.forEach(element => {
        esJugador= ValidarJugador(element);
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
        celdaId.classList.add("numeros");
        celdaNombre.innerText=element.nombre;
        celdaNombre.classList.add("texto_largo");
        celdaApellido.innerText=element.apellido;
        celdaApellido.classList.add("texto_largo");
        celdaEdad.innerText=element.edad;
        celdaEdad.classList.add("numeros");

        celdadEquipo.innerText= esJugador ? element.equipo : "-------";
        celdadEquipo.classList.add("texto_corto");
        celdaPosicion.innerText=esJugador ? element.posicion : "-------";
        celdaPosicion.classList.add("texto_corto");
        celdaGoles.innerText=esJugador ? element.cantidadGoles : "-------"
        celdaGoles.classList.add("numeros");

        celdaTitulo.innerText= !esJugador ? element.titulo : "-------"
        celdaTitulo.classList.add("texto_largo");
        celdaFacultad.innerText=!esJugador ? element.facultad : "-------"
        celdaFacultad.classList.add("texto_largo");
        celdaGraduacion.innerText=!esJugador ? element.anoGraduacion : "-------"
        celdaGraduacion.classList.add("texto_corto");
        
        document.getElementById("tabla").appendChild(filaTabla);
     });
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