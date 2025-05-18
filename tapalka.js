
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

async function buyUpgrade(upgradeId) {
    try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            alert("Please login or sign up");
            return;
        }

        const button = document.querySelector(`[data-upgrade-id="${upgradeId}"]`);
        if (!button) {
            alert("Button not found!");
            return;
        }
        button.disabled = true;
        const response = await fetch('http://localhost:3000/buy-upgrade', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                upgradeId: upgradeId,
                userId: Number(userId) 
            })
        });

        let data;
        try {
            data = await response.json();
        } catch (e) {
            throw new Error("Invalid server response");
        }

        if (!response.ok) {
            throw new Error(data.error || "Unknown error");
        }

        const balanceElement = document.getElementById('moneyy');
        const clickPowerElement = document.getElementById('click-power');
        
        if (balanceElement && data.balance !== undefined) {
            balanceElement.textContent = data.balance;
        }
        
        if (clickPowerElement && data.coinsPerClick !== undefined) {
            clickPowerElement.textContent = data.coinsPerClick;
        }

    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}