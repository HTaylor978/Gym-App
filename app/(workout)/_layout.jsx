import { Stack } from "expo-router";

const WorkoutLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="createWorkout" options={{ headerShown: false }} />
        <Stack.Screen name="createExercise" options={{ headerShown: false }} />
        <Stack.Screen name="addExercise" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default WorkoutLayout;
