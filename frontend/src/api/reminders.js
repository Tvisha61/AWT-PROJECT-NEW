import axios from "axios";

const API_URL = "http://localhost:5000/api/reminders/suggest"; 

export const getSmartReminder = async (note) => {
    try {
        const response = await axios.post(API_URL, { note });
        return response.data.reminder;
    } catch (error) {
        console.error("Error fetching reminder:", error);
        return "Error: Unable to fetch reminder.";
    }
};
