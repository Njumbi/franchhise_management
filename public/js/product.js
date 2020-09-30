$(document).ready(function () {
    fetchProducts()
    addProducts()

});

const fetchProducts = () => {
    var table = $('#products_table').DataTable({
        "pageLength": 30,
        "processing": true,
        "serverSide": false,
        'ajax': {
            'type': 'GET',
            'url': '/products/data'
        },
        "columns": [{
                'data': "name",
                "defaultContent": "",
                "title": "Name"
            },

            {
                'data': "size",
                "defaultContent": "",
                "title": "Size"
            },
            {
                'data': "brand",
                "defaultContent": "",
                "title": "Brand"
            },
            {
                'data': "price",
                "defaultContent": "",
                "title": "P.Item"
            },

            {
                'data': "quantiny",
                "defaultContent": "",
                "title": "Quantity"
            },
            {
                'data': "storeId",
                "defaultContent": "",
                "title": "Store"
            },
            {
                'data': "description",
                "defaultContent": "",
                "title": "Description"
            },
            {
                'data': "image",
                "defaultContent": "",
                "title": "Image",
                "render": function (data) {
                    return '<img src="' + data + '" class="avatar" width="50" height="50"/>';
                }
            },
            {
                'data': "createdAt",
                "defaultContent": "",
                "title": "Created At"
            },

            {
                "targets": -1,
                "data": null,
                "defaultContent": "<button id='delete' class='btn btn-danger'>Delete!</button>"
            }
        ]
    });
}

const addProducts = () => {
    $('#add_product_form').submit(e => {
        e.preventDefault()
        swal({
            title: "Add Product",
            text: "This product will be added to the system",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, () => {
            const csrf = $('#csrf').val()
            const productImg = $('#product_img').get(0).files
            const productName = $('#product_name').val()
            const productSize = $('#product_size').val()
            const productQty = $('#product_qty').val()
            const productBrand = $('#product_brand').val()
            const productPrice = $('#product_price').val()
            const productDesc = $('#product_desc').val()
            const productStore = $('#productStore').val()

            const formData = new FormData()
            formData.append("_csrf", csrf)
            formData.append("image", productImg[0])
            formData.append("productName", productName)
            formData.append("productSize", productSize)
            formData.append("productQty", productQty)
            formData.append("productBrand", productBrand)
            formData.append("productPrice", productPrice)
            formData.append("productDesc", productDesc)
            formData.append("productStore", productStore)


            $.ajax({
                type: "POST",
                url: '/products/add',
                data: formData,
                processData: false,
                contentType: false,
                success: function (data) {
                    if (data.status == true) {
                        swal("Success", data.message, "success")
                        $("#products_table").DataTable().ajax.reload(null, false);
                        $('#addProductModal').modal('hide');
                        $('#add_product_form').reset()
                    } else {
                        swal("Error", data.message, "error")
                    }
                }
            });

        })

    })

}