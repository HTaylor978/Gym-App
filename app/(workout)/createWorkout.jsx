import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import ExerciseCard from "../../components/ExerciseCard";
import CustomButton from "../../components/CustomButton";

import { icons } from "../../constants";
import { router } from "expo-router";

const CreateWorkout = () => {
  // Split title into multiple lines
  const buttonTitle = "Add Exercise";
  const formattedTitle = buttonTitle.split(" ").join("\n");

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="items-center justify-center mt-3">
          <Text className="text-white text-2xl font-psemibold">
            Create a New Workout
          </Text>
        </View>
        <FormField
          title="Workout Name"
          placeholder="Enter the name of the workout"
          otherStyles="p-2 mt-6"
        />
        <View className="items-center justify-center">
          <TouchableOpacity className="mt-8 items-center justify-center py-2 border-2 bg-black-100 border-black-200 rounded-2xl w-[35%]"
            onPress={() => router.push("/createExercise")}
          >
            <Text className="text-gray-100 mb-2 text-base font-psemibold">
              Add Exercise
            </Text>
            <Image
              source={icons.plus}
              tintColor="#FFA001"
              className="h-10 w-10"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateWorkout;
