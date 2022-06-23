var info = document.getElementById("infotext")

var fuerzabruta = `^100
    <br>El algoritmo de Fuerza Bruta realiza una comparación lineal sin previo preprocesamiento 
    Se sitúa el patrón en la primera posición, y se compara carácter a carácter hasta encontrar un
    fallo o llegar al final del patrón. Se pasa a la siguiente posición y se repite el proceso. 
    El proceso finaliza al alcanzar el final del texto.  
    <br>
    <br>No existe un preprocesamiento del patrón como se ve en la animacion.
    <br>Algoritmo de fuerza bruta (T [] O.n - 1 ], P [ 0..m - 1 ])
    <br>
    <br>Input: Array T [0..n - 1 ] de n Caracteres Representados en el Texto
    <br>       Array P [0..m - 1 ] de m caracteres Representados en el Patron
    <br>
    <br>Output: El index de donde se encontro el patron 
    <br>En caso de que no exista el patron retorna -1
    <br>
    `

var kmp = `^100
    <br>El algoritmo de busqueda de cadenas de Knuth-Morris-Pratt(o algoritmo KMP)
    <br>Busca las ocurrencias de un "Patrón" (Subcadena) dentro de un "Texto" 
    <br>(Cadena) principal mediante el uso de la observación, cuando se 
    <br>produce una falta de coincidencia, la palabra en sí incluye información 
    <br>coincidencia, evitando así el reexamen de personajes previamente emparejados. 
    <br>
    <br>Tiempo: O(|N| + |M|) (mucho más rápido en comparación con el trivial O(|N| * |M|))
`

var BoyerMoore = `^100
    <br>El algoritmo preprocesa la cadena (clave) que está siendo 
    buscada, pero no en la cadena en que se busca (no como algunos algoritmos 
    que procesan la cadena en que se busca y pueden entonces amortizar 
    el coste del preprocesamiento mediante búsqueda repetida). 


    <br>El tiempo de ejecución del algoritmo Boyer-Moore, aunque es lineal en el tamaño 
    de la cadena siendo buscada, puede tener un factor significativamente 
    más bajo que muchos otros algoritmos de búsqueda: no necesita comprobar 
    cada carácter de la cadena que es buscada, puesto que salta algunos de 
    ellos. Generalmente el algoritmo es más rápido cuanto más grande es la 
    clave que es buscada, usa la información conseguida desde un intento 
    para descartar tantas posiciones del texto como sean posibles en donde 
    la cadena no coincida.
    <br>
`


var BoyerMooreHorspool = `^100
   
    <br>Es considerado el mejor algoritmo de búsqueda de un patrón en un texto en aplicaciones usuales.
    El algoritmo escanea los caracteres del patrón con el texto iniciando con el carácter más a la derecha.
    En caso de una no ocurrencia o una ocurrencia total del patrón se usa una función preprocesada para saltar:
    Salto del mal carácter(bad-character shift) (o salto de ocurrencia).
    <br>
    <br>Horspool propuso utilizar solamente el salto del mal carácter para calcular los saltos en el algoritmo de Boyer-Moore.
    <br>
    <br>El salto del mal carácter consiste en:
    <br>Alinear cada carácter del alfabeto Σ con la ocurrencia más a la derecha en x[0, …, m-2].
    Si el carácter no ocurre en el patrón x, la no ocurrencia de x puede incluir el carácter, y alinearlo en el lado más izquierdo del patrón.         
    Esta operación (usada en el algoritmo BM) no es muy eficiente para alfabetos pequeños, pero cuando el alfabeto es grande comparado con la longitud del patrón llega a ser muy útil.
    Usarlo sólo produce un algoritmo muy eficiente en la práctica.

    <br>

`


var RabinKarp = `^100
    <br>El algoritmo de Rabin-Karp busca acelerar la prueba de igualdad 
    del patrón con las subcadenas en el texto mediante el
    uso de una función hash. Una función hash
    es una función que convierte cada cadena en un valor numérico,
    llamado su valor hash; por ejemplo, podríamos tener hash('hola') = 5.
    El algoritmo aprovecha el hecho de que si dos cadenas son iguales, 
    sus valores hash también son iguales. Por lo tanto, la coincidencia de cadenas se reduce (casi) a calcular el valor hash del patrón de búsqueda y luego buscar subcadenas de la cadena de entrada con ese valor hash. Sin embargo, hay dos problemas con este enfoque. Primero, debido a que hay tantas cadenas diferentes y tan pocos valores hash, algunas cadenas diferentes tendrán el mismo valor hash. Si los valores hash coinciden, es posible que el patrón y la subcadena no coincidan; en consecuencia, la coincidencia potencial del patrón de búsqueda y la subcadena debe confirmarse comparándolos; esa comparación puede llevar mucho tiempo para subcadenas largas. Afortunadamente, una buena función hash en cadenas razonables generalmente no tiene muchas colisiones, por lo que el tiempo de búsqueda esperado será aceptable.
`