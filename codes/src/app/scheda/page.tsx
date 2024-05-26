'use client'
import Sidebar from "@/components/sidebar"
import { useEffect, useState } from 'react';
import axios from 'axios';

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
        <div>
        <h1>Profile Page</h1>
        <h2>Workout Plan</h2>
        {['gambe', 'schiena', 'petto', 'braccia', 'addome'].map((part) => (
          <div key={part}>
            <h3>{part.charAt(0).toUpperCase() + part.slice(1)}</h3>
            {console.log(`workoutPlan[gambe]:`, workoutPlan.gambe)}
            {workoutPlan[part] && workoutPlan[part].length > 0 ? (
              <ul>
                {workoutPlan[part].map((exercise) => (
                  <li key={exercise._id}>
                    {exercise.name} - {exercise.reps_number} reps x {exercise.sets_number}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No exercises found for this muscle group.</p>
            )}
          </div>
        ))}
      </div>
    );
    };
    
    /*
    <div>
            <h2>Gambe</h2>
            {workoutPlan.gambe.exercises.map((exercise, index) => (
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
    */

export default Scheda