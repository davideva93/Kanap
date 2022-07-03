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
 function panierIdArrayf() {for(let i=0; i<Object.keys(localStorage).length; i++)  
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
            document.querySelectorAll(".deleteItem")[i].addEventListener("click", function() {document.querySelectorAll("article.cart__item ")[i].remove()}) //button supprimer
            if(i==0) { //si [i] est 0 on vise les deux <p> presents dans l'article (couleur et prix). Dans ce cas, <p>[0] et <p>[1]
            document.querySelectorAll(".cart__item__content__description p")[i].innerHTML=Object.keys(localStorage)[i].split(",")[1];
            document.querySelectorAll(".cart__item__content__description p")[i+1].innerHTML=data[idPosition[i]].price;
            total=total+data[idPosition[i]].price;document.getElementById("totalPrice").textContent=total;}
            else { // on vise les deux <p> de l'article [i]. Le pair est la couleur, l'impair est le prix
            document.querySelectorAll(".cart__item__content__description p")[i+1+a].innerHTML=Object.keys(localStorage)[i].split(",")[1];//135
            document.querySelectorAll(".cart__item__content__description p")[i+2+a].innerHTML=data[idPosition[i]].price;
            total=total+data[idPosition[i]].price; document.getElementById("totalPrice").textContent=total;
            a=a+1;} 
            }}

//total=total+parseInt(document.querySelectorAll(".cart__item__content__description p")[i+2+a].textContent); console.log(total)


//var k=0;
//let idPanier;

//function getIdPanier() 
  //      {let nProduitsEnVente=data.length; numberProduitsDifferentsPanier = Object.keys(localStorage).length; 
    //        if(k<numberProduitsDifferentsPanier) // boucle primaire de k fois; k= n produits differents dans le panier
      //          {k=k+1; for(let i=0; i<nProduitsEnVente; i++) //boucle secondaire; pour chaque k, boucle i fois; i=n produits en vente
        //            {Object.keys(localStorage)[k-1].includes(data[i]._id)? // on compare l'id du 1er produit dans le panier avec les id des produits en vente
          //               idPanier=idPanier+","+(data[i]._id)+":"+i:false} ;getIdPanier()} else return} //+i servira ensuite pour recuperer la position de l'id