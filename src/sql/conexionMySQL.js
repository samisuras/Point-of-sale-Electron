//CONEXION MYSQL
/*
const mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "farmacia"
});

con.connect( function(err) {
    if(err){
        throw err;
    }
    else{
        con.query("SELECT * FROM empleado", function (err, result, fields) {
            if(err) throw err;
            console.log(result[0].nombre);
        });
    }
});*/

function verBD()
{
    var i=0;
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Importancia100",
        database: "farmacia"
    });

    con.connect( function(err) {
        if(err){
            throw err;
        }
        else{
            con.query("SELECT * FROM empleado", function (err, result, fields) {
                if(err) throw err;
                var padre = document.getElementById("mostrar");4
                while(result[i]!=null)
                {
                    var parrafo = document.createElement("p");
                    parrafo.innerHTML = result[i].nombre;
                    padre.appendChild(parrafo);
                    i++;
                }
                    
                
            });
        }
    });
    con.end;
}



