var idEmpleado = 0;
function iniciaSesion() 
{
    var encontrado = [false];
    //nombre y contrasena
    var cuenta = document.getElementById("cuenta").value;
    var contra = document.getElementById("contrasena").value;
    //Establecemos conexion a SQL
    const mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "farmacia"
    });
    
    con.connect( function(err) {
        var i=0;
        if(err){
            alert("hola");
        }
        else{
            //QUERY BUSCA EL EMPLEADO SI NO EXISTE MARCA ERROR
            con.query(("SELECT * FROM empleado"), function (err, result, fields) {
                if(err) {
                    alert("Usuario no encontrado");
                }else{
                    //SI EXISTE COMPARA CONTRASENAS
                    while(result[i]!=null)
                    {
                        if(result[i].nombre == cuenta && result[i].contrasena == contra)
                        {
                            idEmpleado = result[i].id_empleado;
                            encontrado[0] = true;
                            var nombreUsuario = result[i].nombre;
                            // In the main process.
                           
                            localStorage.setItem('nombreUsuario', result[i].nombre);
                            
                            window.location="../views/principal.html";
                            
                        }
                        i++;
                    }
                }
            });
        }
    });
    setTimeout("alert('Error en el inicio de sesion')",1500);
    document.getElementById("cuenta").value = " ";
    document.getElementById("contrasena").value = " ";
    
    return false;
}