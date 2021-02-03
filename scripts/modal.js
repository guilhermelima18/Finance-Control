function openModal() {
    const modal = document.querySelector(".modal-overlay");
    const transaction = document.querySelector(".new-transaction");

    transaction.addEventListener("click", () => {
        modal.classList.add("active");
    })

}
openModal();

function closeModal() {
    const modal = document.querySelector(".modal-overlay");
    const cancel = document.querySelector(".button-actions #cancel");

    cancel.addEventListener("click", () => {
        modal.classList.remove("active");
    })
}
closeModal();

const Transaction = {
    all: [
        {
            description: 'Energia',
            amount: -21500,
            date: '20/01/2021',
        },
        {
            description: 'Website',
            amount: 500000,
            date: '22/01/2021',
        },
        {
            description: 'Internet',
            amount: -14000,
            date: '23/01/2021',
        }
    ],

    add(transaction) {
        Transaction.all.push(transaction);
        App.reload();
    },

    remove(index) {
        Transaction.all.splice(index, 1);
        App.reload();
    },

    incomes() {
        let income = 0;

        Transaction.all.forEach((transaction) => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        })
        return income;
    },

    expenses() {
        let expense = 0;

        Transaction.all.forEach((transaction) => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        })
        return expense;
    },

    total() {
        return Transaction.incomes() + Transaction.expenses();
    }
};

const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr');
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);

        DOM.transactionsContainer.appendChild(tr);
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense";

        const amount = Utils.formatCurrency(transaction.amount);

        const html = `
                <td class="description">${transaction.description}</td>
                <td class="${CSSclass}">${amount}</td>
                <td class="data">${transaction.date}</td>
                <td>
                    <img src="./assets/minus.svg" alt="Remover transação">
                </td>
        `
        return html;
    },

    updateBalance() {
        const input = document.getElementById("inputDisplay");
        const output = document.getElementById("outputDisplay");
        const total = document.getElementById("totalDisplay");

        input.innerHTML = Utils.formatCurrency(Transaction.incomes());
        output.innerHTML = Utils.formatCurrency(Transaction.expenses());
        total.innerHTML = Utils.formatCurrency(Transaction.total());
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = "";
    }
};

// Formatando a Moeda
const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        return signal + value
    }
};

const Form = {
    description: document.querySelector("form #description"),
    amount: document.querySelector("form #value"),
    date: document.querySelector("form #date"),

    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        const {description, amount, date} = Form.getValues();

        if (description.trim() === "" || amount.trim() === "" || date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos.")
        }
    },

    submit(event) {
        event.preventDefault();

        try {
            Form.validateFields();
        } 
        catch (error) {
            alert(error.message);
        }
    }
};

const App = {
    init() {
        Transaction.all.forEach((transaction) => {
            DOM.addTransaction(transaction)
        });

        DOM.updateBalance();
    },

    reload() {
        DOM.clearTransactions();
        App.init();
    }
};

App.init();