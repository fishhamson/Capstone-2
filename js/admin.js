//AXIOS
var promise = axios({
    url: "https://64a3f42bc3b509573b56d12f.mockapi.io/products",
    method: "GET",
});
promise
    .then(function (result) {
        // console.log('result',result.data)
        var htmlContent = "";
        for (var i = 0; i < result.data.length; i++) {
            var prd = result.data[i];
            htmlContent += `
            <tr>
        <td><div style="max-width:10px">${i + 1}</div></td>
        <td><div style="max-width:50px">${prd.name}</div></td>
        <td>${prd.price}</td>
        <td>
        <image src=${prd.image} style ='width:50px; height:50px' />
        </td>
        <td><div style="max-width:200px">${prd.desc}</div></td> 
           
        <td>
        <button class="btn btn-warning text-white">Edit <i class="fa fa-pencil-square ms-2"></i></button>
        <button class="btn btn-danger">Delete <i class="fa fa-trash ms-2"></i></button>
        </td>    
        </tr>
            `
        }
        document.getElementById('myTablePhone').innerHTML = htmlContent
    })
    .catch(function (err) {
        console.log(err);
    });
