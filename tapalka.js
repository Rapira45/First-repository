document.getElementById('coin').addEventListener('click', async () => {
    try {
        const response = await fetch('/click', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-ID': localStorage.getItem('userId')
            }
        });
        
        if (!response.ok) throw new Error('Ошибка обновления баланса');
        const data = await response.json();
        updateBalanceDisplay(data.balance);
    } catch (error) {
        console.error(error);
    }
});

setInterval(async () => {
    try {
        const response = await fetch('/passive-income', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-ID': localStorage.getItem('userId')
            }
        });
        
        if (!response.ok) throw new Error('Ошибка пассивного дохода');
        const data = await response.json();
        updateBalanceDisplay(data.balance);
    } catch (error) {
        console.error(error);
    }
}, 1000);