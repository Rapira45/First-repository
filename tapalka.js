
function updateBalanceDisplay(balance) {
    const balanceElement = document.getElementById('moneyy');
    if (balanceElement) {
        balanceElement.textContent = balance;
    } else {
        console.error('Error');
    }
}


document.getElementById('click-button').addEventListener('click', async () => {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert('Login!');
            return;
        }

        const response = await fetch('http://localhost:3000/click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-ID': userId
            }
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Error');
        }

        updateBalanceDisplay(data.balance);

    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
});

let incomeInterval;
function startPassiveIncome() {
    if (incomeInterval) return;
    
    incomeInterval = setInterval(async () => {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            clearInterval(incomeInterval);
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/passive-income', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-ID': userId
                }
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Error');
            }

            updateBalanceDisplay(data.balance);

        } catch (error) {
            console.error('Error', error.message);
        }
    }, 1000);
}

if (localStorage.getItem('userId')) {
    startPassiveIncome();
}