// =====================================
// FashionAI History AI
// history-ai.js
// =====================================

const HISTORY_KEY = "fashionai_history";

export function getHistory(){

    const data = localStorage.getItem(HISTORY_KEY);

    return data ? JSON.parse(data) : [];

}

export function saveHistory(outfit){

    const history = getHistory();

    history.unshift({

        id: Date.now(),

        date: new Date().toISOString(),

        outfit

    });

    // Keep only the latest 100 outfits
    if(history.length > 100){

        history.pop();

    }

    localStorage.setItem(

        HISTORY_KEY,

        JSON.stringify(history)

    );

}

export function clearHistory(){

    localStorage.removeItem(HISTORY_KEY);

}

export function getMostWorn(){

    const history = getHistory();

    const stats = {};

    history.forEach(item => {

        Object.values(item.outfit).forEach(clothing => {

            if(!clothing) return;

            const name = clothing.name;

            stats[name] = (stats[name] || 0) + 1;

        });

    });

    return stats;

}

export function getRecentOutfits(limit = 10){

    return getHistory().slice(0, limit);

}
