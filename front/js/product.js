let data =[]

fetch("http://localhost:3000/api/products")
.then(function(res){
return res.json()
})
.then(function(res){ data=res })
        .then (
        function pageControle(){
            for (let i=0; i<data.length; i++) 
                { if(window.location.href.includes(data[i]._id)) {
                    document.querySelector(".item img").src=data[i].imageUrl
                    document.querySelector(".item__content__titlePrice p").textContent+=" "+data[i].price
                    document.querySelector(".item__content__description p").textContent+=" "+data[i].description
                    let numberOfColor=data[i].colors.length
                    for (let a=0; a<numberOfColor; a++) 
                        {let numberOfPresetColor=document.getElementById("colors").length-1
                            if(numberOfPresetColor<numberOfColor) {let  clone = colors.lastElementChild.cloneNode(true); 
                                {colors.appendChild(clone);}} //si les couleurs préexistantes (2) sont moins que les couleurs du sofa choisi, on clone une couleur préexistante pour pouvoir ensuite effectuer le remplacement
                            document.getElementById("colors")[a+1].innerHTML=data[i].colors[a]; } //remplace les couleur standard avec les vrais

                
                } ;}})


                let  clone = parent.lastElementChild.cloneNode(true); 
                if(i<data.length-1) {parent.appendChild(clone);}