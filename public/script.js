let expenses = [];
let totalAmount = 0;
const categorySelect = document.getElementById('category_select'); // Get the respective id(s) from the HTML file
const amountInput = document.getElementById('amount_input');
const InfoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Every time "Add" is clicked, create a new list of data and push it into the expenses list
addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const info = InfoInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }

    if (isNaN(amount) || amount < 0) {
        alert('Please enter a valid amount');
        return;
    }

    if (info === '') {
        alert('Please enter valid details');
        return;
    }

    if (date === '') {
        alert('Please select a date');
        return;
    }

    expenses.push({ category, amount, info, date }); // Pushing list into expenses list

    // Checking for income or expense
    if (category === 'Income') {
        totalAmount += amount;
    } else if (category === 'Expense') {
        totalAmount -= amount;
    }

    totalAmountCell.textContent = totalAmount; // Updating the total amount cell on the table

    // Creating new row and cells for the expense entry
    const newRow = expenseTableBody.insertRow();
    const CategoryCell = newRow.insertCell();
    const AmountCell = newRow.insertCell();
    const InfoCell = newRow.insertCell();
    const DateCell = newRow.insertCell();
    const DeleteCell = newRow.insertCell();

    // Populating the cells with data
    CategoryCell.textContent = category;
    AmountCell.textContent = amount;
    InfoCell.textContent = info;
    DateCell.textContent = date;

    // Creating and configuring delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        const index = Array.from(expenseTableBody.rows).indexOf(newRow);
        if (index !== -1) {
            // Removing the deleted expense from the expenses array
            const deletedExpense = expenses.splice(index, 1)[0];
            // Adjusting total amount
            if (deletedExpense.category === 'Income') {
                totalAmount -= deletedExpense.amount;
            } else if (deletedExpense.category === 'Expense') {
                totalAmount += deletedExpense.amount;
            }
            totalAmountCell.textContent = totalAmount;
            // Removing the row from the table
            expenseTableBody.deleteRow(index);
        }
    });

    DeleteCell.appendChild(deleteBtn); // Appending delete button to the delete cell
});
