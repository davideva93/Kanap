let data =[]

fetch("http://localhost:3000/api/products")
.then(function(res){
return res.json()
})
.then(function(res){
    console.log(res) ; console.log(res[0]) ; data=res
        })
        .then (
        function pageControle(){
            for (let i=0; i<data.length; i++) 
                { if(window.location.href.includes(data[i]._id)) {
                    console.log("trovato"+ i )} else{ console.log("non trovato");}}})
        