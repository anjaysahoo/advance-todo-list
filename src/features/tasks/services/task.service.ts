import axios from 'axios';

const TASKS_API_URL = 'https://gist.githubusercontent.com/yangshun/7acbe005af922e43a26dea8109e16aed/raw/01df391c8320df0a37c73fdbf6b8fc7d88aae719/greatfrontend-tasks.json';

export const fetchInitialTasks = async () => {
    const response = await axios.get(TASKS_API_URL);
    return response.data.map((task: any) => ({
        ...task
    }));
}; 