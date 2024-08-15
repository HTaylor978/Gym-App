import { FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <Text className="text-gray-100 font-psemibold text-2xl text-center mt-3">
        Current Workouts
      </Text>
      <FlatList />
      <CustomButton
        title="Create Workout"
        handlePress={() => router.push("/createWorkout")}
      />
    </SafeAreaView>
  );
};

export default Home;
