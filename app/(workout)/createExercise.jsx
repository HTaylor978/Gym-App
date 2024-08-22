import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from "react-native";
import FormField from "../../components/FormField";
import ToggleableSwitch from "../../components/ToggleableSwitch";
import { useEffect, useState } from "react";

const CreateExercise = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [primarySelected, setPrimarySelected] = useState(true);
  const [primaryMuscle, setPrimaryMuscle] = useState("");
  const [secondaryMuscles, setSecondaryMuscles] = useState([]);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  useEffect(() => {
    // Fetch data from Flask API
    fetch("http://192.168.0.163:5000/get-muscles")
      .then((responce) => responce.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="bg-secondary" />
        <Text>Loading...</Text>
      </View>
    );
  }

  // Calculate width of cells in muscle grid
  const numCols = 3;
  const cellWidth = Dimensions.get("window").width / numCols;

  const handleMuscleSelect = (muscle) => {
    if (primarySelected) {
      setPrimaryMuscle(muscle.title);
      setSecondaryMuscles([]);
      setPrimarySelected(false);
    } else {
      if (secondaryMuscles.includes(muscle.title)) {
        setSecondaryMuscles(secondaryMuscles.filter((m) => m !== muscle.title));
      } else {
        setSecondaryMuscles([...secondaryMuscles, muscle.title]);
      }
    }
  };

  const handleToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <View className="bg-primary h-full">
      <FormField
        title="Exercise Name"
        placeholder="Exercise Name"
        otherStyles="mt-12 p-2"
        titleStyles="text-xs"
      />
      <View className="mx-2 mt-3">
        <Text className="text-gray-100 text-base font-pmedium text-xs mb-2 px-1">
          Muscles Trained
        </Text>
      </View>
      <View className="mx-2 border-black-200 border-2 bg-black-100">
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => setPrimarySelected(true)}
            className={`flex-1 ${
              primarySelected ? "my-2" : "bg-black-200 justify-center"
            }`}
          >
            <Text className="text-white text-center text-lg font-psemibold">
              Primary
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPrimarySelected(false)}
            className={`flex-1 ${
              !primarySelected ? "my-2" : "bg-black-200 justify-center"
            }`}
          >
            <Text className="text-white text-center text-lg font-psemibold">
              Secondary
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            const isPrimarySelected =
              !primarySelected && item.title === primaryMuscle;
            const isSecondarySelected = secondaryMuscles.includes(item.title);
            return (
              <View
                style={{ width: cellWidth }}
                className={`flex-1 items-center justify-content m-1.5 border-2 ${
                  isPrimarySelected ? "bg-black-200" : "bg-primary"
                } ${
                  isSecondarySelected && !primarySelected
                    ? "border-secondary"
                    : "border-transparent"
                } p-5`}
              >
                <TouchableOpacity
                  onPress={() => handleMuscleSelect(item)}
                  disabled={isPrimarySelected && !primarySelected}
                  className="items-center justify-center"
                >
                  <Text className="text-white">{item.image}</Text>
                  <Text className="text-white">{item.title}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item) => item.image.toString()}
          numColumns={numCols}
          className="mt-1"
        />
      </View>
      <View className="bg-black-100 mx-2 p-2 mt-5 border-2 border-black-200 flex-row items-center">
        <Text className="font-psemibold text-base text-gray-100 flex-1">
          Single Arm / Leg
        </Text>
        <ToggleableSwitch 
          isOn={isSwitchOn}
          label="Single Arm/leg"
          onToggle={handleToggleSwitch}
        />
      </View>
    </View>
  );
};

export default CreateExercise;
