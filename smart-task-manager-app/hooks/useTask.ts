import { useEffect, useState } from "react";
import API from "../services/api";
import { Task } from "../types/task";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      console.log("Fetching from API...");
      const res = await API.get("/tasks");

      const apiTasks = res.data.data;

      setTasks(apiTasks);

      // Save to local storage
      await AsyncStorage.setItem("tasks", JSON.stringify(apiTasks));

      console.log("Saved to local storage");
    } catch (error) {
      console.log("API failed. Loading from local storage...");

      const localTasks = await AsyncStorage.getItem("tasks");

      if (localTasks) {
        setTasks(JSON.parse(localTasks));
      } else {
        console.log("No local data found");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return { tasks, loading, fetchTasks };
};