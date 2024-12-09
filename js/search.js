function filterCards() {
    // Kunin ang input mula sa search box
    let input = document.getElementById('searchInput').value.toLowerCase();
    
    // Kunin ang lahat ng cards
    let cards = document.querySelectorAll('.hm_card');

    // Loop sa bawat card at itago o ipakita base sa pangalan
    cards.forEach(function(card) {
        let cardName = card.getAttribute('data-name').toLowerCase();
        
        // Kung tumutugma ang input sa pangalan ng card, ipakita ang card; kung hindi, itago ito
        if (cardName.includes(input)) {
            card.style.display = 'block';  // Ipakita ang card
        } else {
            card.style.display = 'none';  // Itago ang card
        }
    });
}
