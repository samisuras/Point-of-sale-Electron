//Variables globales
var mysql = require('mysql');
    
var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "farmacia"
});
ban = 0;

//Funciones
function menu()
{
    ban++;
    if((ban %2)!=0)
    {
        document.getElementById("Categorias").hidden = false;
        document.getElementById("Marcas").hidden = false;
        document.getElementById("Inventario").hidden = false;
        
    }
    else{
        document.getElementById("Categorias").hidden = true;
        document.getElementById("Marcas").hidden = true;
        document.getElementById("Inventario").hidden = true;
        
    }
    
}

function agregar()
{
    document.getElementById("agregarProductos").hidden = false;
    document.getElementById("cambiarProductos").hidden = true;
    document.getElementById("eliminar").hidden = true;

}
var error = false;
function agregarProducto()
{
    
    var id = document.getElementById("id_producto").value;
    var lab = document.getElementById("laboratorio").value;
    var fCad = document.getElementById("fCaducidad").value;
    var existencia = document.getElementById("existencia").value;
    var nombre = document.getElementById("nombre").value;
    var precio = document.getElementById("precio").value;

    con.connect( function(err) {
        if(err)
        {
            error = true;
            return;
        }
        else{
            error = false;
            return;
        }
    });
    if(error == false)
    {
        //MEDICAMENTO
        con.query("INSERT INTO medicamento VALUES('"+lab+"','"+fCad+"','"+nombre+"','"+precio+"','"+existencia+"');", function (err, result, fields,error) {
            if(err)
            {
                alert(err);
                error = true;

            }
        });

        var sql = "INSERT INTO codigo_barra VALUES('"+id+"','"+nombre+"');"
        con.query(sql, function (err, result, fields) {
            if(err)
            {
                alert(err);
                error = true;
            }
        });
    }
    setTimeout( () => {
        if(error == false)
        {
            alert("Producto agregado exitosamente!");
        }
    }, 900)
    
}

//AGREGA PRODUCTOS A LA LISTA DE LA BD
function agregarProductosLista(){
    error = false;
    document.getElementById("cambiarProductos").hidden = false;
    document.getElementById("eliminar").hidden = true;
    document.getElementById("agregarProductos").hidden = true;
    
    limpiarListaProductos();
    con.connect( function(err) {
        if(err)
        {
            error = true;
            return;
        }
        else{
            error = false;
            return;
        }
    });
    if(error == false)
    {
        con.query("SELECT * FROM medicamento;", function(err, result, fields) {
            if(err)
            {
                alert("Error en la BD");
            }
            else
            {
                var i=0;
                while(result[i] != null)
                {
                    var opcion = document.createElement("option");
                    opcion.setAttribute('value',result[i].nombre);
                    document.getElementById("productos").appendChild(opcion);
                    i++;
                }
            }
        });
    }
}

function limpiarListaProductos()
{
    var lista = document.getElementById("productos");
    while ( lista.firstChild ) {
        lista.removeChild(lista.firstChild);
    }
}

var idGlobal;

function ponerDatosForm()
{
    
    error = false;
    var selecionado = document.getElementById("productoSelecionado").value;
    con.connect( function(err) {
        if(err)
        {
            error = true;
            return;
        }
        else{
            error = false;
            return;
        }
    });
    if(error == false)
    {

        con.query("SELECT * FROM medicamento;", function (err,result,fields) {
            if(err)
            {
                alert(err);
            }
            else
            {
                var i=0;
                document.getElementById("modificar").hidden = false;
                while(result[i] != null)
                {
                    if(selecionado == result[i].nombre)
                    {
                        document.getElementById("existenciaC").value = result[i].existencia;
                        document.getElementById("nombreC").value = result[i].nombre;
                        document.getElementById("precioC").value = result[i].precio;
                        document.getElementById("laboratorioC").value = result[i].laboratorio;
                        document.getElementById("fCaducidadC").value = result[i].fecha_caducidad;
                        break;
                    }
                    i++;
                }
            }
        });
    }
}

function modificarProducto()
{
    error = false;
    con.connect( function(err) {
        if(err)
        {
            error = true;
            return;
        }
        else{
            error = false;
            return;
        }
    });

    if(error == false)
    {
        var idGlobal;
        var productoCambio = document.getElementById("nombreC").value;
        var productoOriginal = document.getElementById("productoSelecionado").value;
        var existencia = document.getElementById("existenciaC").value;
        var precio = document.getElementById("precioC").value;
        var lab = document.getElementById("laboratorioC").value;
        var caducidad =  document.getElementById("fCaducidadC").value;

        con.query("UPDATE medicamento SET laboratorio = '" + lab + "', fecha_caducidad = '"+caducidad+"', nombre = '"+productoCambio+"', precio = '"+precio+"', existencia = '"+existencia+"'  WHERE nombre = '" + productoOriginal + "'", function(err,result)
        {
            if(err)
            {
                alert(err);
            }
            console.log(result.affectedRows);
        });
        
    }
    setTimeout("irInventario()",700);

}

function irInventario()
{
    window.location="../views/Inventario.html";
}

function eliminar() 
{
    document.getElementById("cambiarProductos").hidden = true;
    document.getElementById("agregarProductos").hidden = true;
    document.getElementById("eliminar").hidden = false;

    error = false;

    limpiarListaProductos();
    con.connect( function(err) {
        if(err)
        {
            error = true;
            return;
        }
        else{
            error = false;
            return;
        }
    });
    if(error == false)
    {
        con.query("SELECT * FROM medicamento;", function(err, result, fields) {
            if(err)
            {
                alert("Error en la BD");
            }
            else
            {
                var i=0;
                while(result[i] != null)
                {
                    var opcion = document.createElement("option");
                    opcion.setAttribute('value',result[i].nombre);
                    document.getElementById("productos").appendChild(opcion);
                    i++;
                }
            }
        });
    }

}

function confirmacionEliminar()
{
    var selecionado = document.getElementById("productoSelecionadoE").value
    if(confirm("Desea borrar el articulo: "+selecionado+"?"))
    {

        con.connect(function(err) {
            
        });

        sql = "DELETE FROM medicamento WHERE nombre = '"+selecionado+"'";
        con.query(sql, function(err, result, fields) {
            if(err)
                alert(err);

            console.log(result);
        });
    }
    else
        alert("No se dio de baja el producto");
}