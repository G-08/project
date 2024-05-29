'use client'
import Sidebar from "@/components/sidebar"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation";
import { Modal, message } from "antd";

interface Exercise {
  name: string;
  muscular_group: string;
  exercise_description: string;
  reps_number: number;
  sets_number: number;
}

interface Workout {
  muscular_group: string;
  exercises: Exercise[];
}

interface WorkoutPlan {
    userEmail: String;
    gambe: Workout;
    schiena: Workout;
    petto: Workout;
    braccia: Workout;
    addome: Workout;
}

const Scheda = () => {
    const [workoutPlan, setWorkoutPlan] = useState(null);
    const [error, setError] = useState(String);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const onDelete = async () => {
        try {
            await axios.delete("/api/auth/deleteScheda");
            message.success('Scheda eliminata correttamente');

        } catch (error) {
            console.error('Si è verificato un errore durante l\'eliminazione della scheda:', error);
            message.error('Si è verificato un errore durante l\'eliminazione della scheda');
        }
    };

    useEffect(() => {
        const fetchWorkoutPlan = async () => {
        try {
            const response = await axios.get(`/api/auth/getScheda`);
            console.log("Response data: ", response.data);
            setWorkoutPlan(response.data.data);
        } catch (error) {
            setError('Failed to fetch workout plan.');
        } finally {
            setLoading(false);
        }
        };

        fetchWorkoutPlan();
    }, []);

    useEffect(() => {
        if (workoutPlan) {
        console.log("Workout plan: ", workoutPlan);
        }
    }, [workoutPlan]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!workoutPlan) {
        return <div>No workout plan found.</div>;
    }

    return (
        <div className='flex dark:bg-black dark:text-white'>
            <Sidebar />
            <div>
                <h1>Scheda allenamento</h1>
                <div>
                    <h2>Gambe</h2>
                    {workoutPlan.gambe.exercises.map((exercise : Exercise, index) => (
                    <div key={index}>
                        <h3>{exercise.name}</h3>
                        <p>{exercise.exercise_description}</p>
                        <p>Reps: {exercise.reps_number}</p>
                        <p>Sets: {exercise.sets_number}</p>
                    </div>
                    ))}
                </div>
                <div>
                    <h2>Schiena</h2>
                    {workoutPlan.schiena.exercises.map((exercise, index) => (
                    <div key={index}>
                        <h3>{exercise.name}</h3>
                        <p>{exercise.exercise_description}</p>
                        <p>Reps: {exercise.reps_number}</p>
                        <p>Sets: {exercise.sets_number}</p>
                    </div>
                    ))}
                </div>
                <div>
                    <h2>Petto</h2>
                    {workoutPlan.petto.exercises.map((exercise, index) => (
                    <div key={index}>
                        <h3>{exercise.name}</h3>
                        <p>{exercise.exercise_description}</p>
                        <p>Reps: {exercise.reps_number}</p>
                        <p>Sets: {exercise.sets_number}</p>
                    </div>
                    ))}
                </div>
                <div>
                    <h2>Braccia</h2>
                    {workoutPlan.braccia.exercises.map((exercise, index) => (
                    <div key={index}>
                        <h3>{exercise.name}</h3>
                        <p>{exercise.exercise_description}</p>
                        <p>Reps: {exercise.reps_number}</p>
                        <p>Sets: {exercise.sets_number}</p>
                    </div>
                    ))}
                </div>
                <div>
                    <h2>Addome</h2>
                    {workoutPlan.addome.exercises.map((exercise, index) => (
                    <div key={index}>
                        <h3>{exercise.name}</h3>
                        <p>{exercise.exercise_description}</p>
                        <p>Reps: {exercise.reps_number}</p>
                        <p>Sets: {exercise.sets_number}</p>
                    </div>
                    ))}
                </div>
            </div>
            <button onClick={onDelete}>elimina scheda</button>
        </div>
        
    );
};
        
        
    

export default Scheda