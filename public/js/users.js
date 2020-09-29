$(document).ready(function () {
    fetchUsers()
    addUser()

});

const fetchUsers = () => {
    var table = $('#users_table').DataTable({
        "pageLength": 30,
        "processing": true,
        "serverSide": false,
        'ajax': {
            'type': 'GET',
            'url': '/users/data'
        },
        "columns": [{
                'data': "firstName",
                "defaultContent": "",
                "title": "First Name"
            },
            {
                'data': "secondName",
                "defaultContent": "",
                "title": "Second Name"
            },
            {
                'data': "email",
                "defaultContent": "",
                "title": "Email"
            },
            {
                'data': "role",
                "defaultContent": "",
                "title": "Role"
            },
            {
                'data': "createdAt",
                "defaultContent": "",
                "title": "Created At"
            },
            {
                "targets": -1,
                "data": null,
                "defaultContent": "<button id='edit' class='btn btn-info'>Edit!</button>"
            },
            {
                "targets": -1,
                "data": null,
                "defaultContent": "<button id='delete' class='btn btn-danger'>Delete!</button>"
            }
        ]

    });

    //delete user onclick
    $('#users_table').on('click', 'button#delete', function () {
        var data = table.row($(this).parents('tr')[0]).data();

        //confirm delete
        swal({
            title: "Delete User",
            text: "This user will be deleted to the system",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, () => {
            //make request to controller
            $.get('/users/delete?email=' + data.email + "&firstName=" + data.firstName + "&role=" + data.role, function (data, status) {
                if (data.status == true) {
                    swal("success", data.message, "success")
                    $("#users_table").DataTable().ajax.reload(null, false);
                } else {
                    swal("Error", data.message, "error")
                }
            })

        })


    });
}

const addUser = () => {
    $("#add_user_form").submit(e => {
        e.preventDefault()
        swal({
            title: "Add User",
            text: "This user will be added to the system",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Continue",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        }, function () {
            // collect data from form
            const csrf = $('#csrf').val()
            const firstName = $('#first_name').val()
            const secondName = $('#second_name').val()
            const email = $('#email').val()
            const password = $('#password').val()

            const data = {
                "_csrf": csrf,
                "firstname": firstName,
                "secondName": secondName,
                "email": email,
                "password": password
            }
            //submit data
            $.post("/users/add", data, function (data, status) {
                if (data.status == true) {
                    swal("success", data.message, "success")
                    $("#users_table").DataTable().ajax.reload(null, false);
                    $('#addUserModal').modal('hide');
                } else {
                    swal("Error", data.message, "error")
                }
            });

        });


    })
}