// AXIOS
function danhSachSanPham() {
    var promise = axios({
        url: "https://64a3f42bc3b509573b56d12f.mockapi.io/products",
        method: "GET",
    })
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
            <button
             class="btn btn-warning text-white" data-toggle="modal" data-target="#myModal"
            onclick="updateProduct(${prd.id})">Edit<i class="fa fa-pencil-square ms-2"></i>
            </button>
            <button class="btn btn-danger"
            onclick="deleteProduct(${prd.id})">Delete<i class="fa fa-trash ms-2"></i></button>
            </td>    
            </tr>
                `
            }
            document.getElementById('myTablePhone').innerHTML = htmlContent
        })
        .catch(function (err) {
            console.log(err);
        });

}
danhSachSanPham()
//ham get element
function getElement(element) {
    return document.querySelector(element)
}

function getThongTinSanPham() {
    //lay thong tin từ user
    var name = getElement('#name').value
    var price = getElement('#price').value
    var screen = getElement('#screen').value
    var backCamera = getElement('#backCamera').value
    var frontCamera = getElement('#frontCamera').value
    var image = getElement('#img').value
    var desc = getElement('#description').value
    var type = getElement('#type').value
    // tạo đối tượng san phẩm từ lớp đối tương
    var product = new SanPham(name, price, screen, backCamera, frontCamera, image, desc, type)
    //---validation
    //name
    var isValid = true
    isValid &= kiemTraChuoi(product.name, 1, undefined, '#TBname', '*Tên không được để trống*');
    //price
    var isValid = true
    isValid &= kiemTraChuoi(product.price, 1, undefined, '#TBprice', '*Không được để trống*')
        &&
        kiemTraSo(product.price, '#TBprice', /^[0-9]+$/, 'Price phải là số');
    //screen
    isValid &= kiemTraChuoi(product.screen, 1, undefined, '#TBscreen', '*Không được để trống*');
    //backCamera
    isValid &= kiemTraChuoi(product.backCamera, 1, undefined, '#TBbackCamera', '*Không được để trống*');
    //frontCamera
    isValid &= kiemTraChuoi(product.frontCamera, 1, undefined, '#TBfrontCamera', '*Không được để trống*');
    //image
    isValid &= kiemTraChuoi(product.image, 1, undefined, '#TBimg', '*Không được để trống*');
    //desc
    isValid &= kiemTraChuoi(product.desc, 1, undefined, '#TBdescription', '*Không được để trống*');
    //type
    isValid &= kiemTraLuaChon(product.type, '#TBtybe', '*Vui lòng chọn sản phẩm*');

    return isValid ? product : undefined;
}

// thêm sản phẩm
getElement('#btnAddPhone').onclick = function () {
    //Lấy thông tin product
    var product = getThongTinSanPham()
    if (!product)
        return
    // call API tạo product
    var promise = axios({
        url: "https://64a3f42bc3b509573b56d12f.mockapi.io/products",
        method: "POST",
        data: product,
    })

    promise
        //tạo thành công
        .then(function () {
            //dom tới btn clone đóng modal
            document.querySelector('.btn-close').click()
            //get lại danh sách prd sau khi tạo thành công
            danhSachSanPham()
            //return ve promise.Reject hoặc throw Error => nhảy xuống catch
        })
        // tạo thất bại
        .catch(function () {
            alert('tạo sản phẩm thất bại')
        })
}
// xóa sản phẩm
function deleteProduct(idProduct) {
    var promise = axios({
        url: `https://64a3f42bc3b509573b56d12f.mockapi.io/products/${idProduct}`,
        method: 'DELETE',
    })
    promise
        // xóa thành công
        .then(function () {
            danhSachSanPham()
        })
        //xóa sản phẩm thất bại
        .catch(function () {
            alert('xóa sản phẩm thất bại')
        })
}
//update sản phẩm
var idProductUpdate = ''
function updateProduct(idProduct) {
    var promise = axios({
        url: `https://64a3f42bc3b509573b56d12f.mockapi.io/products/${idProduct}`,
        method: 'GET',
    })
    promise.then(function (result) {
        var prd = result.data
        idProductUpdate = prd.id
        //dom và show UI
        getElement('#name').value = prd.name
        getElement('#price').value = prd.price
        getElement('#img').value = prd.image
        getElement('#description').value = prd.desc
    })
}

getElement('#btnUpdate').onclick = function () {
    //lấy thông tin sau edit
    var productEdit = getThongTinSanPham()
    var promise = axios({
        url: `https://64a3f42bc3b509573b56d12f.mockapi.io/products/${idProductUpdate}`,
        method: 'PUT',
        data: productEdit,
    })
    promise.then(function () {
        getElement('.btn-close').click()
        danhSachSanPham()
    })
}



getElement('#iphoneSearch').addEventListener('keyup', function () {
    var valueSearch = getElement('#iphoneSearch').value.toLowerCase()
    console.log(valueSearch);
    // var arrKHSearch = []
    // for(var i = 0; i < abc.length; i++){
    //     tenKH = product[i].name.toLowerCase()
    //     if(tenKH.indexOf(valueSearch) !== -1){
    //         arrKHSearch.push(product[i])
    // }
    // }

    // danhSachSanPham(arrKHSearch)
})
function timKiemSanPham(keyword) {
    var keyword = document.getElementById("iphoneSearch").value.toLowerCase();
    var promise = axios({
        url: "https://64a3f42bc3b509573b56d12f.mockapi.io/products?name=" + keyword,
        method: 'GET',
    })
    promise
        .then(function (response) {
            var products = response.data;
            displaySearchResults(products);
        })
        .catch(function (error) {
            // console.log(error);
            danhSachSanPham(error)
        });
}
function displaySearchResults(product) {
    var searchResultsContainer = document.getElementById("myTablePhone");
    searchResultsContainer.innerHTML = "";
    if (products.length === 0) {
        // Không tìm thấy sản phẩm
        searchResultsContainer.textContent = "Không tìm thấy sản phẩm.";
    } else {
        // Hiển thị kết quả tìm kiếm
        for (var i = 0; i < products.length; i++) {
            var product = products[i];
            var productElement = document.createElement("div");
            productElement.textContent = product.name;
            searchResultsContainer.appendChild(productElement);
        }
    }
}

let tmp = true

getElement("#CPrice").addEventListener("click", () => {
    let table = document.getElementById("myTable")
    let rows = Array.from(table.rows).slice(1)
    if (tmp) {
        getElement('#PUp').style.display = "inline-block"
        getElement('#PDown').style.display = "none"
        rows.sort((a, b) => a.cells[2].textContent - b.cells[2].textContent);
    } else {
        getElement('#PUp').style.display = "none"
        getElement('#PDown').style.display = "inline-block"
        rows.sort((a, b) => b.cells[2].textContent - a.cells[2].textContent);
    }

    tmp = !tmp
    rows.forEach(row => table.appendChild(row))
})