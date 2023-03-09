// $('#table-content').css('border', 'dotted 5px green');
const validateUser = (user) => {
    if (isNaN(user.age)) {
        alert('age must be a number');
        return 1;
    }
    return 0;
}

const addTableRowWithUser = (user) => {
    const id = user.id;
    let tableRaw =
        '<tr id="trId' + id + '">' +
        '<td class="tdId">' + id + '</td>' +
        '<td class="firstName">' + user.firstName + '</td>' +
        '<td class="lastName">' + user.lastName + '</td>' +
        '<td class="age">' + user.age + '</td>' +
        '<td class="email">' + user.email + '</td>' +
        '<td class="roles">' + user.roles + '</td>' +
        '<td> ' +
        '<input type="button" class="btn btn-info editButton" value="Edit" data-id ="' + id + '" ' +
        'data-bs-toggle="modal" data-bs-target="#userEditDynamic" /> ' +
        ' </td>' +
        '<td> ' +
        '<input type="button" class="btn btn-danger deleteButton" value="Delete" data-id ="' + id + '" ' +
        'data-bs-toggle="modal" data-bs-target="#userDeleteDynamic" /> ' +
        ' </td>' +
        '</tr>'
    $('#table-content').append(tableRaw);
}

const editTableRowWithUser = (user) => {
    const id = user.id;
    const targetRowId = '#trId' + id;
    const targetRow = $(targetRowId, '#table-content');
    const tableRow =

        '<td class="tdId">' + id + '</td>' +
        '<td class="firstName">' + user.firstName + '</td>' +
        '<td class="lastName">' + user.lastName + '</td>' +
        '<td class="age">' + user.age + '</td>' +
        '<td class="email">' + user.email + '</td>' +
        '<td class="roles">' + user.roles + '</td>' +

        '<td> ' +
        '<input type="button" class="btn btn-info editButton" value="Edit" data-id ="' + id + '" ' +
        'data-bs-toggle="modal" data-bs-target="#userEditDynamic" /> ' +
        ' </td>' +
        '<td> ' +
        '<input type="button" class="btn btn-danger deleteButton" value="Delete" data-id ="' + id + '" ' +
        'data-bs-toggle="modal" data-bs-target="#userDeleteDynamic" /> ' +
        ' </td>'

    targetRow.text('');
    targetRow.append(tableRow)
}

const addUser = async (user) => {
    let response = await fetch('http://localhost:8080/api/users', {
        method: 'POST', headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }, body: JSON.stringify(user)
    });

    const result = await response.json();
    return result;
}

const removeUserById = async (id) => {
    const url = 'http://localhost:8080/api/users/' + id
    const response = await fetch(url, {
        method: 'DELETE'
    });

    if (response.ok) {
        return await response.json();
    }
    return null;
}

const editUser = async (user) => {

    const url = 'http://localhost:8080/api/users';
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    var result = await response.json();
    return result;
}


//show modal window for editing dynamically added user
//edit button handler
$('#table-content').on("click", ".editButton", async function () {
    const targetRow = $(this).parent().parent();

    const id = $(this).data('id');
    const firstName = $('.firstName', targetRow).text();
    const lastName = $('.lastName', targetRow).text();
    const age = $('.age', targetRow).text();
    const email = $('.email', targetRow).text();
    const roles = $('.roles', targetRow).text();

    const modalEditWindow = $('#dynamicEditModalWindowContent');
    $('#idEditDynamic', modalEditWindow).val(id);
    $('#firstNameEditDynamic', modalEditWindow).val(firstName);
    $('#lastNameEditDynamic', modalEditWindow).val(lastName);
    $('#ageEditDynamic', modalEditWindow).val(age);
    $('#emailEditDynamic', modalEditWindow).val(email);
    $('#passwordEditDynamic', modalEditWindow).val('leave old password');
})

//save edited user
//confirm save
$('#userEditDynamic').on("click", "#editConfirm", async function () {

    const modalEditeWindowContent = $('#dynamicEditModalWindowContent');

    const id = $('#idEditDynamic', modalEditeWindowContent).val();
    const firstName = $('#firstNameEditDynamic', modalEditeWindowContent).val();
    const lastName = $('#lastNameEditDynamic').val();
    const age = $('#ageEditDynamic', modalEditeWindowContent).val();
    const email = $('#emailEditDynamic', modalEditeWindowContent).val();
    const password = $('#passwordEditDynamic', modalEditeWindowContent).val();
    const listPossibleRoles = $('#rolesEditDynamic', modalEditeWindowContent).val();
    let user = {
        id,
        firstName,
        lastName,
        age,
        email,
        password,
        listPossibleRoles
    }

    user = await editUser(user);
    editTableRowWithUser(user);

})


//show modal window for delete dynamically added user
//delete button handler
$('#table-content').on("click", ".deleteButton", async function () {
    const targetRow = $(this).parent().parent();

    const id = $(this).data('id');
    const firstName = $('.firstName', targetRow).text();
    const lastName = $('.lastName', targetRow).text();
    const age = $('.age', targetRow).text();
    const email = $('.email', targetRow).text();
    const roles = $('.roles', targetRow).text();

    const modalDeleteWindow = $('#dynamicDeleteModalWindowContent');
    $('#idDeleteDynamic', modalDeleteWindow).val(id);
    $('#firstNameDeleteDynamic', modalDeleteWindow).val(firstName);
    $('#lastNameDeleteDynamic', modalDeleteWindow).val(lastName);
    $('#ageDeleteDynamic', modalDeleteWindow).val(age);
    $('#emailDeleteDynamic', modalDeleteWindow).val(email);
    $('#rolesDeleteDynamic', modalDeleteWindow).val(roles);
    $('#calledButtonId', modalDeleteWindow).val(targetRow);
})


//confirm deleting user
$('#userDeleteDynamic').on("click", "#deleteConfirm", async function () {

    const modalDeleteWindow = $('#dynamicDeleteModalWindowContent');
    const id = $('#idDeleteDynamic', modalDeleteWindow).val();


    const result = await removeUserById(id);
    if (result !== null) {
        const trId = '#trId' + id;
        $(trId).remove();
    } else {
        alert('something wrong with deleting');
    }

})


//add new user handler
$('#card-newUser').on("click", "#addUserButton", async function () {

    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const age = $('#age').val();
    const email = $('#email').val();
    const password = $('#password').val();
    const listPossibleRoles = $('#role').val();
    let user = {
        firstName,
        lastName,
        age,
        email,
        password,
        listPossibleRoles
    }
    const validateResult = validateUser(user);

    if (validateResult == 0) {
        user = await addUser(user);
    } else return;

    $('#firstName').val('');
    $('#lastName').val('');
    $('#age').val('');
    $('#email').val('');
    $('#password').val('');
    $('#role').val('');

    document.getElementById('nav-users-tab').click();
    addTableRowWithUser(user);
})


