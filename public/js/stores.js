$(document).ready(function () {
    fetchStores()
    addStore()

});

const fetchStores = () => {
    var table = $('#stores_table').DataTable({
        "pageLength": 30,
        "processing": true,
        "serverSide": false,
        'ajax': {
            'type': 'GET',
            'url': '/stores/data'
        },
        "columns": [{
                'data': "storeName",
                "defaultContent": "",
                "title": "Store Name"
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



    $('#stores_table').on('click', 'button#delete', function () {
        var data = table.row($(this).parents('tr')[0]).data();
        console.log(data)
        swal({
            title: "Delete Store",
            text: "This store will be deleted from the system",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, () => {
            $.get('/stores/delete?storeName=' + data.storeName, function (data, status) {
                if (data.status == true) {
                    swal("success", data.message, "success")
                    $("#stores_table").DataTable().ajax.reload(null, false);
                } else {
                    swal("Error", data.message, "error")
                }
            })
        })
    })
}


const addStore = () => {
    $('#add_store_form').submit(e => {
        e.preventDefault()
        swal({
            title: "Add Store",
            text: "This store will be added to the system",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, () => {
            const csrf = $('#csrf').val()
            const storeName = $('#store_name').val()

            const storeData = {
                "_csrf": csrf,
                "storeName": storeName
            }

            console.log(storeData)
            $.post('/stores/add', storeData, (data, status) => {
                console.log(data)
                if (data.status == true) {
                    swal("success", data.message, "success")
                    $("#stores_table").DataTable().ajax.reload(null, false);
                    $('#addStoreModal').modal('hide');
                } else {
                    swal("Error", data.message, "error")
                }

            })
        })

    })

}