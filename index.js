const buttonAdd = document.querySelector('.btn_add')
const tableContainer = document.querySelector('.table_container')
const formContainer = document.querySelector('.form_container')
const buttonSubmit = document.querySelector('.btn_submit')
const tableBody = document.querySelector('.tbody')
const searchInputs = document.querySelectorAll('.search')
const headersTable = document.querySelectorAll('.headerName')

// const error = {
//     field: 'string',
//     errorMessage: 'string'
// } просто для наглядности

let studentList = []
let student = {
    firstName: '',
    middleName: '',
    lastName: '',
    birthday: '',
    startEducation: '',
    faculty: ''
}


function showAddForm() {
    //показываем форму для заполнения или табличку с данными
    buttonAdd.addEventListener('click', () => {
        tableContainer.classList.toggle('hidden')
        formContainer.classList.toggle('hidden')

        if (tableContainer.classList.contains('hidden')) {
            buttonAdd.textContent = 'Close'
        } else {
            buttonAdd.textContent = '+ Add'
        }

        const fields = [
            inputFirstName,
            inputMiddleName,
            inputLastName,
            inputBirthday,
            inputStartEducation,
            inputFaculty,
        ]

        fields.forEach(field => {
            field.value = ''
            removeErrorFromInput(field)
        })
    })
}


function submitForm() {
    //записываем в объект данные из инпутов, валидируем
    buttonSubmit.addEventListener('click', () => {
        student = {
            firstName: inputFirstName.value.trim(),
            middleName: inputMiddleName.value.trim(),
            lastName: inputLastName.value.trim(),
            birthday: inputBirthday.value.trim(),
            startEducation: inputStartEducation.value.trim(),
            faculty: inputFaculty.value.trim()
        }

        const field_errors = validationForm(student)

        if (!!field_errors.length) { // if errors exists
            renderErrors(field_errors)
        } else {
            studentList.unshift(student)
            tableContainer.classList.toggle('hidden')
            formContainer.classList.toggle('hidden')

            inputFirstName.value = ''
            inputMiddleName.value = ''
            inputLastName.value = ''
            inputBirthday.value = ''
            inputStartEducation.value = ''
            inputFaculty.value = ''

            renderTable(studentList)
            if (tableContainer.classList.contains('hidden')) {
                buttonAdd.textContent = 'Close'
            } else {
                buttonAdd.textContent = '+ Add'
            }
        }
    })
}

function renderTable(renderList) {
    //рендерим таблицу
    tableBody.innerHTML = ''

    renderList.forEach(el => {
        let birthday = new Date(el.birthday).toLocaleString().split(',')[0]
        let startsEducation = new Date(el.startEducation).toISOString().split('T')[0]


        let age = new Date().getFullYear() - new Date(el.birthday).getFullYear()
        let fullToday = new Date().toISOString().split('T')[0]
        let fullBirthday = new Date(el.birthday).toISOString().split('T')[0]
        if (fullToday < fullBirthday) {
            age -= 1
        }
        let beginningEducation = new Date().getFullYear() - new Date(el.startEducation).getFullYear()
        let fullBeginningEducation = new Date(el.startEducation).toISOString().split('T')[0]
        if (fullToday < fullBeginningEducation) {
            beginningEducation -= 1
        }
        if (beginningEducation < 4) {
            beginningEducation = beginningEducation + ' курс'
        } else if (beginningEducation === 4) {
            if (new Date(el.startEducation).toISOString().split('-')[1] >= 9) {
                beginningEducation = 'закончил'
            } else {
                beginningEducation = beginningEducation + ' курс'
            }
        } else {
            beginningEducation = 'закончил'
        }

        let index = renderList.indexOf(el)
        let tableElement =
            `<tr>
                    <th scope="row">${index + 1}</th>
                    <td class="name">${el.firstName} ${el.middleName} ${el.lastName}</td>
                    <td class="faculty">${el.faculty}</td>
                    <td class="age">${birthday} (${age} лет)</td>
                    <td class="course">${startsEducation} (${beginningEducation})</td> 
            </tr>`
        tableBody.innerHTML = tableBody.innerHTML + tableElement
    })
}


//замокать данные для теста в таблицу
for (let i = 0; i < 9; i++) {
    const arr = ['Saha', 'Petr', 'Alina', 'Masha', 'Katya', 'Valera', 'Alexey', 'Gena', 'Poly and Max']

    let student = {
        firstName: arr[i],
        middleName: 'German',
        lastName: 'Petrol',
        birthday: `199${i}-0${i + 1}-0${i + 1}`,
        startEducation: `200${i}-0${i + 1}-0${i + 1}`,
        faculty: 'Chemistry'
    }

    studentList.unshift(student)

}
renderTable(studentList)


function sortColumns() {
    //сортировка по колонкам
    let trigger = true
    headersTable.forEach(el => {
        el.addEventListener('click', () => {
            const sortBy = el.getAttribute('sortBy')
            if (trigger) {
                trigger = false
                sortBodyAsc(sortBy)
            } else {
                trigger = true
                sortBodyDesc(sortBy)
            }
        })
    })
}


function sortBodyAsc(sortBy) {
    if (sortBy === 'name') {
        studentList.sort((prev, next) => {
            const prevFullName = `${prev.firstName}${(prev.middleName || '')}${prev.lastName}`
            const nextFullName = `${next.firstName}${(next.middleName || '')}${next.lastName}`

            return (prevFullName < nextFullName ? -1 : 1)
        })
    } else {
        studentList.sort((prev, next) => {
            const prevElement = prev[sortBy]
            const nextElement = next[sortBy]

            return (prevElement < nextElement ? -1 : 1)
        })
    }

    renderTable(studentList)
}

function sortBodyDesc(sortBy) {
    if (sortBy === 'name') {
        studentList.sort((prev, next) => {
            const prevFullName = `${prev.firstName}${(prev.middleName || '')}${prev.lastName}`
            const nextFullName = `${next.firstName}${(next.middleName || '')}${next.lastName}`

            return (prevFullName > nextFullName ? -1 : 1)
        })
    } else {
        studentList.sort((prev, next) => {
            const prevElement = prev[sortBy]
            const nextElement = next[sortBy]

            return (prevElement > nextElement ? -1 : 1)
        })
    }

    renderTable(studentList)
}


function filter() {
    //фильтрация
    let sortedList = []


    searchInputs.forEach((input, index) => {
            const listForSort = index === 0 ? studentList : sortedList

            let filterBy = input.getAttribute('filterBy')
            let inputContent = input.value.toLowerCase()

            sortedList = listForSort.filter(student => {
                if (filterBy === 'name') {
                    let fullName = `${student.firstName} ${(student.middleName || '')} ${student.lastName}`
                    return fullName.toLowerCase().includes(inputContent)
                }
                if (filterBy === 'faculty') {
                    return student.faculty.toLowerCase().includes(inputContent)
                }
                if (filterBy === 'birthday') {
                    return student.birthday.toLowerCase().includes(inputContent)
                }
                if (filterBy === 'startEducation') {
                    return student.startEducation.toLowerCase().includes(inputContent)
                }
            })
        }
    )
    renderTable(sortedList)
}

function filterInit() {
    //иинициализация фильтров
    searchInputs.forEach(el => el.addEventListener('keyup', filter))
}


showAddForm()
submitForm()
sortColumns()
filterInit()


