/**
 * Programa que encripta y desencripta un mensaje dado.
 * Hecho con conceptos basicos de javascript, html ycss
 * @author saul-code
 */

//Variables
const llave = [[1,0,0],[2,1,0],[1,1,1]];
const llavedecode = [[1,0,0],[-2,1,0],[1,-1,1]];
var entrada;
let btnEncode =document.getElementById('encode');
let btnDecode = document.getElementById('decode');
let resultado = document.getElementById('resultado');

btnEncode.onclick = encripta;
btnDecode.onclick = desencriptar;


/**
 * Función para encriptar el mensaje 
 */
function encripta(){
    //entrada del input
    entrada =document.getElementById('form').value;

    if(entrada.length!=0 ){
        //junta la entrada y lo transforma en un arreglo
        let entradaArray= entrada.split('');

        //Convierte todo a numeros
        for(var i = 0; i<entradaArray.length; i++){
            entradaArray[i] = charToInt(entradaArray[i].toLowerCase());
            if(entradaArray[i] == -1){
                alert('mensaje no válido');
                aparecer();
                return ; 
            }
        }
        let entradaVecotres = vectoresMensaje(entradaArray);

        desaparece(); 

        //muestra el resultado
        document.getElementById('resultadodiv').style.display='block';

        let stringResultado = codifica(entradaVecotres).join(' ');
        resultado.innerHTML = stringResultado; 
    }else{
        alert('Ingrese un mensaje por favor');
        aparecer();
    }
}

/**
 * Funcion para desencriptar el mensaje
 **/
function desencriptar(){
    entrada =document.getElementById("form").value;

    if(entrada.length != 0){
        let entradaArray = entrada.split(' ');

        let entradaVectores = vectoresMensaje(entradaArray);

        let stringResultado = [];

        stringResultado = decodificar(entradaVectores).join('');

        resultado.innerHTML = stringResultado;
    }else{
        alert('Ingrese un mensaje por favor');
        aparecer();
    }
}


/**
 * Codifica el mensaje multiplicando por la llave
 * @param {[]} mensajevectores arreglo de numeros.
 * @returns {[]} arreglo codificado
 */
function codifica(mensajevectores){
    let salidaVectores = [];
    for(var i =0,a=0; i<mensajevectores.length; a+=3,i++){
        let vectorColumna = [[],[],[]];
        vectorColumna[0][0] =mensajevectores[i][0];
        vectorColumna[1][0] =mensajevectores[i][1];
        vectorColumna[2][0] =mensajevectores[i][2];

        let vectorColumna2 = multiply(llave,vectorColumna);
        salidaVectores[a] =  vectorColumna2[0][0];
        salidaVectores[a+1] = vectorColumna2[1][0];
        salidaVectores[a+2] = vectorColumna2[2][0];
    }
    return salidaVectores;
}


/**
 * Decodifica el arreglo de numeros multiplicando por la llave y regresando
 * el arreglo de letras.
 * @param {[]} entrada arreglo de numeros.
 * @returns {[]} arreglo de letras.
 */
function decodificar(entrada){
    let salidaVectores = [];
    for(var i =0, a=0; i<entrada.length; a+=3,i++){
        let vectorColumna = [[],[],[]];
        vectorColumna[0][0] = entrada[i][0];
        vectorColumna[1][0] = entrada[i][1];
        vectorColumna[2][0] = entrada[i][2];

        let vectorColumna2 = multiply(llavedecode,vectorColumna);
        salidaVectores[a] = vectorColumna2[0][0];
        salidaVectores[a+1] = vectorColumna2[1][0];
        salidaVectores[a+2] = vectorColumna2[2][0];
    }
    for(var i =0; i < salidaVectores.length; i++){
        console.log(intToChar(salidaVectores[i]));
        salidaVectores[i] = intToChar(salidaVectores[i]);
    }
    return salidaVectores;

}

/**
 * Separa el arreglo de <code>entrada</code> en una matriz de nx3 con n la longitud del arreglo 
 * entre 3 y si no es divisible entre 3 se agrega celdas vacias para que sea divisble
 * @param {[]} entrada
 * @return {[]} arreglo de numeros.
 **/
function vectoresMensaje(entrada){
    let vectores = [];
    if(entrada.length%3 == 0 ){
        var numVec = entrada.length/3;
        for(var a =0,m=0;m<numVec;m++,a+=3){
            vectores[m]=[];
            vectores[m].push(entrada[a]);
            vectores[m].push(entrada[a+1]);
            vectores[m].push(entrada[a+2]);
        }
    }else{
        var numVec = Math.floor(entrada.length/3);
        for(var a =0,m=0;m<numVec;m++,a+=3){
            vectores[m]=[];
            vectores[m].push(entrada[a]);
            vectores[m].push(entrada[a+1]);
            vectores[m].push(entrada[a+2]);
        }
        var residuo = entrada.length%3;
        if ( residuo == 2){
            vectores[numVec] = [];
            vectores[numVec].push(entrada[(numVec*3)]);
            vectores[numVec].push(entrada[(numVec*3)+1]);
            vectores[numVec].push(' ');
        }else {
            vectores[numVec] = [];
            vectores[numVec].push(entrada[(numVec*3)]);
            vectores[numVec].push(' ');
            vectores[numVec].push(' ');
        }
    }
    return vectores;

}

/**
 * Desaparece los elementos de la clase box
 */
function desaparece(){
    document.getElementById('foto').style.display='none';
    document.getElementById('mensaje').style.display = 'none';
}

/**
 * Aparece los elementos de la clase box y desaparece
 * el mensaje codificado.
 */
function aparecer(){
    document.getElementById('foto').style.display='block';
    document.getElementById('mensaje').style.display = 'block';
    document.getElementById('resultadodiv').style.display ='none';
}

/**
 * Copia en el portapapeles el valor del elemento resultado.
 */
function copiarPortapapeles(){
    var aux = document.createElement("input");
    aux.setAttribute("value",document.getElementById("resultado").innerHTML);

    document.body.appendChild(aux);
    aux.select();

    document.execCommand("copy");
    document.body.removeChild(aux);

    document.getElementById('alert').style.display='block';
    setTimeout(function(){
        document.getElementById('alert').style.display='none';
        console.log("hola");
    },2000);
}

/**
 * Multiplica dos arreglos
 * @param {Array} a 
 * @param {Array} b 
 * @returns {[]} multiplicacion de a*b
 */
function multiply(a, b) {
    var aNumRows = a.length, aNumCols = a[0].length,bNumRows = b.length, bNumCols = b[0].length,
    m = new Array(aNumRows);  
    for (var r = 0; r < aNumRows; ++r) {
        m[r] = new Array(bNumCols); 
        for (var c = 0; c < bNumCols; ++c) {
            m[r][c] = 0;            
            for (var i = 0; i < aNumCols; ++i) {
                m[r][c] += a[r][i] * b[i][c];
            }
        }
    }
    return m;
}

/**
 * Asigna un numero entero a un caracter.
 * @param {number} entero 
 * @returns {symbol} simbolo
 */
function intToChar(entero){
    let diccionarios = {
        0: ' ',1:'a',2:'b',3:'c',4:'d',5:'e',6:'f',7:'g',8:'h',9:'i',10:'j',
        11:'k', 12:'l',13:'m',14:'n',15:'ñ',16:'o',17:'p',18:'q',19:'r',20:'s',
        21:'t',22:'u',23:'v',24:'w',25:'x',26:'y',27:'z'
    }
    if(diccionarios[entero]=== undefined) return diccionarios[Math.random()*20];
    return diccionarios[entero];
}

/**
 * Asigna un símbolo a un número entero w
 * @param {symbol} caracter 
 * @returns {number} numero.
 */
function charToInt(caracter){ 
    let diccionarios = {
        ' ': 0,'d':4,'h':8,'l':12,'o':16,'s':20,'w':24,
        'a': 1,'e':5,'i':9,'m':13,'p':17,'t':21,'x':25,
        'b': 2,'f':6,'j':10,'n': 14,'q':18,'u':22,'y':26,
        'c': 3,'g':7,'k':11,'ñ': 15,'r':19,'v':23,'z':27
    }
    if(diccionarios[caracter] === undefined) return-1;
    return diccionarios[caracter];
}
