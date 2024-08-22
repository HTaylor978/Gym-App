import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import FormField from "../../components/FormField";
import { icons } from "../../constants";
import { router } from "expo-router";

const AddExercise = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-center items-center mt-3">
          <Text className="text-gray-100 text-2xl font-psemibold">
            Add an Exercise
          </Text>
          <FormField
            placeholder="Enter the name of the exercise"
            otherStyles="p-2"
          />
        </View>
        <View className="items-center justify-center">
          <TouchableOpacity
            className="mt-8 items-center justify-center py-2 border-2 bg-black-100 border-black-200 rounded-2xl w-[35%]"
            onPress={() => router.push("/createExercise")}
          >
            <Text className="text-gray-100 mb-2 text-base font-psemibold text-center">
              Create an Exercise
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

export default AddExercise;
