const TARIFA_BASE = 2.00;
const KM_LIMITE = 4;
const BLOQUE_KM = 1;
const PRECIO_BLOQUE = 0.25;

const slider = document.getElementById("descuento");
const discountValue = document.getElementById("discountValue");
const modal = document.getElementById("modalResultado");

slider.oninput = function(){
discountValue.innerText = this.value + "%";
}

function calcular(){

let distancia = parseFloat(document.getElementById("distancia").value);
let descuento = parseFloat(slider.value);

if(isNaN(distancia) || distancia <= 0){
alert("Ingresa una distancia válida");
return;
}

let total = TARIFA_BASE;

if(distancia > KM_LIMITE){

let extraKm = distancia - KM_LIMITE;

let bloques = extraKm / BLOQUE_KM;

total += bloques * PRECIO_BLOQUE;

}

let descuentoAplicado = total * (descuento / 100);

let totalFinal = total - descuentoAplicado;

document.getElementById("resultado").innerHTML = `
<p>Distancia: ${distancia} km</p>
<p>Tarifa sin descuento: $${total.toFixed(2)}</p>
<p>Descuento aplicado: -$${descuentoAplicado.toFixed(2)}</p>
<hr>
<h3 style="color:#10b14a;">Total a pagar: $${totalFinal.toFixed(2)}</h3>
`;

modal.style.display="flex";

}

function cerrarModal(){
modal.style.display="none";
}

function limpiar(){

document.getElementById("distancia").value="";
slider.value=0;
discountValue.innerText="0%";
cerrarModal();

}

function guardarImagen(){

let distancia=parseFloat(document.getElementById("distancia").value);
let descuento=parseFloat(slider.value);

let total=TARIFA_BASE;

if(distancia>KM_LIMITE){

let extraKm=distancia-KM_LIMITE;
let bloques=extraKm/BLOQUE_KM;
total+=bloques*PRECIO_BLOQUE;

}

let descuentoAplicado=total*(descuento/100);
let totalFinal=total-descuentoAplicado;

let comprobante=document.getElementById("imagenComprobante");

comprobante.innerHTML=`

<h2 style="color:#10b14a;text-align:center;">GOXPRESS</h2>

<hr>

<p><strong>Distancia:</strong> ${distancia} km</p>

<p><strong>Total sin descuento:</strong> $${total.toFixed(2)}</p>

<p><strong>Descuento:</strong> ${descuento}%</p>

<hr>

<h3 style="color:#10b14a;text-align:center;">
Total a pagar: $${totalFinal.toFixed(2)}
</h3>

<p style="font-size:12px;text-align:center;margin-top:15px;">
${new Date().toLocaleString()}
</p>

`;

html2canvas(comprobante).then(canvas=>{

let link=document.createElement("a");

link.download="goxpress-comprobante.png";

link.href=canvas.toDataURL();

link.click();

});

}