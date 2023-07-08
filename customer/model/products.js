
function danhSachSanPham() {
    var promise = axios({
        url: "https://64a3f42bc3b509573b56d12f.mockapi.io/products",
        method: "GET",
    })
    promise
        .then(function (result) {
            console.log('result PRD',result.data)
            var htmlContent = "";
            for (var i = 0; i < result.data.length; i++) {
                var prd = result.data[i];
                htmlContent += `
                <div class="col-lg-3 col-md-6">
                <div class="card text-black h-100">
                <div class="content-overlay"></div>
                  <img src=${prd.image} class="card-img" alt="Phone Image" />
                  <div class="content-details fadeIn-top">
                  <h3 class ='pb-5'>Specifications</h3>
                        <div class="d-flex justify-content-start py-1">
                      <span class='text-light'><b>Screen:</b></span>
                      <span class='text-light'>&nbsp ${prd.screen}</span>
                    </div>
                    <div class="d-flex justify-content-start py-1">
                      <span class='text-light'><b>Back Camera:</b> ${prd.backCamera}</span>
                    </div>
                    <div class="d-flex justify-content-start py-1">
                      <span class='text-light'><b>Front Camera:</b> ${prd.frontCamera}</span>
                    </div>
            
                    <p class = 'pt-5'><u>click here for more details</u></p>
                  </div>
                  <div class="card-body">
                    <div class="text-center">
                      <h5 class="card-title pt-3">${prd.name}</h5>
                      <span class="text-muted mb-2">$${prd.price}</span>
                      <span class="text-danger"><s>$${Number(prd.price) + 300}</s></span>
                    </div>
                    <div class="mt-3 brand-box text-center">
                      <span>${prd.type}</span>
                    </div>
                    <div class="d-flex justify-content-start pt-3">
                      <span><b>Description:</b> ${prd.desc}</span>
                    </div>
                    <div class="d-flex justify-content-between pt-3">
                      <div class="text-warning">
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                      </div>
                      <span class = 'text-success'><b>In Stock</b></span>
                    </div>
                    <button type="button" class="btn btn-block w-50" onclick ="btnAddToCart('${prd.id
                    }')">Add to cart</button>
                  </div>
                </div>
              </div>
                `
            }
            document.getElementById('phoneList').innerHTML = htmlContent
        })
        .catch(function (err) {
            console.log(err);
        });

}
danhSachSanPham()