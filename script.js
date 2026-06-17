// ELKASS Premium 2025
const opinions = [

{
name:"Marek K.",
city:"Olesno",
text:"Profesjonalne doradztwo i bardzo dobra obsługa. Zawsze można liczyć na pomoc przy wyborze sprzętu."
},

{
name:"Anna P.",
city:"Dobrodzień",
text:"Duży wybór produktów oraz bardzo miła obsługa klienta."
},

{
name:"Tomasz W.",
city:"Praszka",
text:"Kupowałem telewizor. Fachowe doradztwo i szybka realizacja."
},

{
name:"Joanna S.",
city:"Kluczbork",
text:"Świetna obsługa oraz atrakcyjne ceny. Polecam."
},

{
name:"Piotr D.",
city:"Radłów",
text:"Bardzo dobre podejście do klienta i profesjonalna pomoc."
},

{
name:"Ewa M.",
city:"Gorzów Śląski",
text:"Kupowałam lodówkę. Wszystko przebiegło sprawnie."
},

{
name:"Patrycja G.",
city:"Olesno",
text:"Od lat wracamy po sprzęt RTV i AGD. Zawsze jesteśmy zadowoleni."
},

{
name:"Robert J.",
city:"Rudniki",
text:"Duży wybór i bardzo dobre ceny."
},

{
name:"Monika Z.",
city:"Byczyna",
text:"Profesjonalna obsługa i fachowa pomoc przy zakupach."
},

{
name:"Łukasz T.",
city:"Lubliniec",
text:"Szybka realizacja zamówienia i bardzo dobry kontakt."
}

];
const reviewsGrid =
document.getElementById("reviews-grid");

let reviewIndex = 0;

function renderReviews(){

if(!reviewsGrid) return;

reviewsGrid.innerHTML = "";

for(let i=0;i<5;i++){

const review =
opinions[(reviewIndex+i)%opinions.length];

reviewsGrid.innerHTML += `

<div class="review-card">

<div class="review-stars">
★★★★★
</div>

<p class="review-text">
${review.text}
</p>

<div class="review-author">
${review.name}
</div>

<div class="review-location">
${review.city}
</div>

</div>

`;

}

}

renderReviews();

setInterval(()=>{

reviewIndex++;

if(reviewIndex >= opinions.length){

reviewIndex = 0;

}

renderReviews();

},5000);
