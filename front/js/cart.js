let data =[]

fetch("http://localhost:3000/api/products")
.then(function(res){
return res.json()
})
.then(function(res){ data=res})


let numberProduitsDifferentsPanier = Object.keys(localStorage).length
cloneArticlePanier() //pour créer x articles dans le panier; x= quantité art. differents
function cloneArticlePanier() { for(let i=0; i<numberProduitsDifferentsPanier-1; i++) 
    {let  clone = cart__items.lastElementChild.cloneNode(true); 
        cart__items.appendChild(clone);}}


let idArray =[] ; //array contenant tous les id des produits en vente
 function idArrayf() {for(let i=0; i<data.length; i++) {idArray.push(data[i]._id)}} 

 

let panierIdArray=[]; //array contentant tous les id des produits differents achetés
 function panierIdArrayf() {panierIdArray=[]; for(let i=0; i<Object.keys(localStorage).length; i++)  
    {panierIdArray.push(Object.keys(localStorage)[i].split(",")[0])}}
                      

setTimeout( idArrayf, 500)
panierIdArrayf()
setTimeout(idPositionf,1000)
setTimeout(detailsPanier,1500)
let idPosition=[] //array contenant les positions des articles achetés dans le catalogue de vente
function idPositionf(){
    for (const value of panierIdArray) {
        for(let i=0; i<idArray.length; i++) {if(value==idArray[i]) idPosition.push(i)}
}}


function detailsPanier () {let a=0; let total=0;

    for(let i=0; i<panierIdArray.length; i++) {
            document.querySelectorAll(".cart__item__content__description h2")[i].innerHTML=data[idPosition[i]].name;//vise le seul h2 de [i] (le nom du produit) et le met à jour
            document.querySelectorAll("input.itemQuantity")[i].value=window.localStorage.getItem(Object.keys(localStorage)[i]).split(",")[1] //vise le seul input.quantity de [i]  et le met à jour
            document.querySelectorAll(".cart__item__img img")[i].src=data[idPosition[i]].imageUrl;
            document.querySelectorAll(".deleteItem")[i].addEventListener("click", function() 
              {document.querySelectorAll("article.cart__item ")[i].remove();localStorage.removeItem(Object.keys(localStorage)[i]);panierIdArrayf(); idPositionf();detailsPanier()}) //button supprimer
            if(i==0) { //si [i] est 0 on vise les deux <p> presents dans l'article (couleur et prix). Dans ce cas, <p>[0] et <p>[1]
            document.querySelectorAll(".cart__item__content__description p")[i].innerHTML=Object.keys(localStorage)[i].split(",")[1];
            document.querySelectorAll(".cart__item__content__description p")[i+1].innerHTML=data[idPosition[i]].price;
            total=total+data[idPosition[i]].price*parseInt(document.querySelectorAll("input.itemQuantity")[i].value) //prix * quantité
            document.getElementById("totalPrice").textContent=total;}
            else { // on vise les deux <p> de l'article [i]. Le pair est la couleur, l'impair est le prix
            document.querySelectorAll(".cart__item__content__description p")[i+1+a].innerHTML=Object.keys(localStorage)[i].split(",")[1];//135
            document.querySelectorAll(".cart__item__content__description p")[i+2+a].innerHTML=data[idPosition[i]].price;
            total=total+data[idPosition[i]].price*parseInt(document.querySelectorAll("input.itemQuantity")[i].value);
             document.getElementById("totalPrice").textContent=total;
            a=a+1;} 
            }}



//formulaire
document.getElementById("order").addEventListener("click", goToConfirmation)

function goToConfirmation(event) //!!!!!!!!!!!!!
{event.preventDefault(); if(document.getElementById("cityErrorMsg").textContent==""&&document.getElementById("city").value!=""&&
document.getElementById("firstNameErrorMsg").textContent==""&&document.getElementById("firstName").value!=""&&
document.getElementById("lastNameErrorMsg").textContent==""&&document.getElementById("lastName").value!=""&&
document.getElementById("addressErrorMsg").textContent==""&&document.getElementById("address").value!=""&&
document.getElementById("emailErrorMsg").textContent==""&&document.getElementById("email").value!="")
  {console.log("giusto"); window.location.href="http://127.0.0.1:5500/front/html/confirmation.html"} else 
  {alert("Pour valider est necessaire completer le formulaire")}}

const formulaireElements = document.querySelectorAll(".cart__order__form__question input");
formulaireElements.forEach((formulaireElement)=>{
  formulaireElement.addEventListener("input", (e)=>{
    switch (e.target.id){ 
      case "firstName": prenomf(e.target.value) 
        break;
      case "lastName": nomf(e.target.value)
        break;
      case "address": adressef(e.target.value)
        break;
      case "city": villef(e.target.value)
        break;
      case "email":emailf(e.target.value)
        break; 
      default: null;}})})

function prenomf(value){if(value.match(/^[a-zA-Z è é ê -\.]+$/)==null)
  {document.getElementById("firstNameErrorMsg").innerHTML="Le prénom peut contenir que des lettres"}else
  {document.getElementById("firstNameErrorMsg").innerHTML=""}

}

function nomf(value){if(value.match(/^[a-zA-Z è é ê -\.]+$/)==null)
{document.getElementById("lastNameErrorMsg").innerHTML="Le nom peut contenir que des lettres"}else
{document.getElementById("lastNameErrorMsg").innerHTML=""} //nom ok
  
}
function adressef(value){if(value.match(/^[a-zA-Z è é ê 0-9 -\.]+$/)==null)
{document.getElementById("addressErrorMsg").innerHTML="L'adresse ne semble pas valide"}else
{document.getElementById("addressErrorMsg").innerHTML=""}
}
function villef(value){if(value.match(/^[a-zA-Z è é ê -\.]+$/)==null)
{document.getElementById("cityErrorMsg").innerHTML="Le nom de la ville doit contenir que des lettres"}
else{document.getElementById("cityErrorMsg").innerHTML=""}
  
}
function emailf(value){if(value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)==null)
{document.getElementById("emailErrorMsg").innerHTML="L'email semble incorrecte ou incomplete"}else
{document.getElementById("emailErrorMsg").innerHTML=""} 
  
}






//total=total+parseInt(document.querySelectorAll(".cart__item__content__description p")[i+2+a].textContent); console.log(total)


//var k=0;
//let idPanier;

//function getIdPanier() 
  //      {let nProduitsEnVente=data.length; numberProduitsDifferentsPanier = Object.keys(localStorage).length; 
    //        if(k<numberProduitsDifferentsPanier) // boucle primaire de k fois; k= n produits differents dans le panier
      //          {k=k+1; for(let i=0; i<nProduitsEnVente; i++) //boucle secondaire; pour chaque k, boucle i fois; i=n produits en vente
        //            {Object.keys(localStorage)[k-1].includes(data[i]._id)? // on compare l'id du 1er produit dans le panier avec les id des produits en vente
          //               idPanier=idPanier+","+(data[i]._id)+":"+i:false} ;getIdPanier()} else return} //+i servira ensuite pour recuperer la position de l'id