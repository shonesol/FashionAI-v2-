// =====================================
// FashionAI Weekly Planner
// planner.js
// =====================================

const STORAGE_KEY = "fashionai_weekly_plan";

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

export function getWeeklyPlan(){

    const data = localStorage.getItem(STORAGE_KEY);

    if(data){

        return JSON.parse(data);

    }

    const plan = {};

    DAYS.forEach(day=>{

        plan[day]=null;

    });

    return plan;

}

export function saveWeeklyPlan(plan){

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(plan)

    );

}

export function saveOutfitForDay(day,outfit){

    const plan = getWeeklyPlan();

    plan[day]=outfit;

    saveWeeklyPlan(plan);

}

export function getOutfitForDay(day){

    const plan = getWeeklyPlan();

    return plan[day];

}

export function clearDay(day){

    const plan = getWeeklyPlan();

    plan[day]=null;

    saveWeeklyPlan(plan);

}

export function clearWeek(){

    localStorage.removeItem(STORAGE_KEY);

}

export function getDays(){

    return DAYS;

}
