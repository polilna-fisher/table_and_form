const inputFirstName = document.getElementById('validationCustom01')
const inputMiddleName = document.getElementById('validationCustom02')
const inputLastName = document.getElementById('validationCustom03')
const inputBirthday = document.getElementById('validationCustom04')
const inputStartEducation = document.getElementById('validationCustom05')
const inputFaculty = document.getElementById('validationCustom06')

function addErrorToInput(input, message) {
    removeErrorFromInput(input)

    const parentDiv =  input.parentElement

    const errorMessage = document.createElement('p')
    errorMessage.classList.add('field_error-message')
    errorMessage.textContent = message

    parentDiv.append(errorMessage)

    input.classList.add('field_error')
}

function removeErrorFromInput(input){
    const parentDiv = input.parentElement
    const errorMessage = parentDiv.querySelector('.field_error-message')
    if (errorMessage) {
        errorMessage.remove()
    }

    input.classList.remove('field_error')
}

function renderErrors (field_errors){
    field_errors.forEach((error) => {
        switch (error.field) {
            case 'firstName' : {
                addErrorToInput(inputFirstName, error.message)
                break
            }
            case 'lastName' : {
                addErrorToInput(inputLastName, error.message)
                break
            }
            case 'birthday' : {
                addErrorToInput(inputBirthday, error.message)
                break
            }
            case 'startEducation' : {
                addErrorToInput(inputStartEducation, error.message)
                break
            }
            case 'faculty' : {
                addErrorToInput(inputFaculty, error.message)
                break
            }
        }
    })
}

function validationForm(student) {
    const field_errors = []

    // валидация данных
    let birthday = new Date(student.birthday)
    let educationDate = new Date(student.startEducation)
    let startDate = new Date('1900-01-01')
    let startEducationDate = new Date('2000-01-01')

    // let error = false

    if (student.firstName === '') {
        field_errors.push({
            field: 'firstName',
            message: 'Required field'
        })
    }
    if (student.lastName === '') {
        field_errors.push({
            field: 'lastName',
            message: 'Required field'
        })
    }
    if (student.birthday === '') {
        field_errors.push({
            field: 'birthday',
            message: 'Required field'
        })
    }
    if (student.startEducation === '') {
        field_errors.push({
            field: 'startEducation',
            message: 'Required field'
        })
    }
    if (student.faculty === '') {
        field_errors.push({
            field: 'faculty',
            message: 'Required field'
        })
    }


    if (student.birthday !== '' && (birthday > new Date() || birthday < startDate)) {
        field_errors.push({
            field: 'birthday',
            message: 'Error: please, choose the correct birthday'
        })
    }

    if (student.startEducation !== '' && (educationDate > new Date() || educationDate < startEducationDate)) {
        field_errors.push({
            field: 'startEducation',
            message: 'Error: please, choose the correct start education'
        })
    }

    return field_errors
}


inputFirstName.addEventListener('keypress', (event) => removeErrorFromInput(event.target))
inputLastName.addEventListener('keypress', (event) => removeErrorFromInput(event.target))
inputBirthday.addEventListener('change', (event) => removeErrorFromInput(event.target))
inputStartEducation.addEventListener('change', (event) => removeErrorFromInput(event.target))
inputFaculty.addEventListener('change', (event) => removeErrorFromInput(event.target))