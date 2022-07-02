let data =[]

fetch("http://localhost:3000/api/products")
.then(function(res){
return res.json()
})
.then(function(res){ data=res})


let numberProduitsDifferentsPanier = Object.keys(localStorage).length
cloneArticlePanier()
function cloneArticlePanier() { for(let i=0; i<numberProduitsDifferentsPanier-1; i++) 
    {let  clone = cart__items.lastElementChild.cloneNode(true); 
        cart__items.appendChild(clone);}}
var k=0;
let idPanier;

function getIdPanier() 
        {let nProduitsEnVente=data.length; numberProduitsDifferentsPanier = Object.keys(localStorage).length; 
            if(k<numberProduitsDifferentsPanier) // boucle primaire de k fois; k= n produits differents dans le panier
                {k=k+1; for(let i=0; i<nProduitsEnVente; i++) //boucle secondaire; pour chaque k, boucle i fois; i=n produits en vente
                    {Object.keys(localStorage)[k-1].includes(data[i]._id)? // on compare l'id du 1er produit dans le panier avec les id des produits en vente
                         idPanier=idPanier+","+(data[i]._id)+":"+i:false} ;getIdPanier()} else return} //+i servira ensuite pour recuperer la position de l'id



function affichageDetails()
            {for(let i=1; i<idPanier.split(":").length; i++)
                {let a=idPanier.split(":")[i][0]; console.log(i); document.querySelectorAll(".cartAndFormContainer img")[i].currentSrc=data[a].imageUrl }
            } //a corriger

   getIdPanier()
   affichageDetails()
     






   // {parseInt(window.localStorage.getItem(Object.keys(localStorage)[i]).split(",")[1])