import { useState, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";

const ToggleableSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  const translateX = useRef(new Animated.Value(0)).current;

  const toggleSwitch = () => {
    const targetValue = isOn ? 0 : 30;

    // Animate the movement of the switch
    Animated.timing(translateX, {
      toValue: targetValue,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setIsOn(!isOn);
  };

  return (
    <TouchableOpacity
      onPress={toggleSwitch}
      className={`flex-row items-center w-[70px] h-[40px] rounded-3xl border-2 overflow-hidden ${
        isOn ? "border-secondary" : "border-black-200"
      }`}
    >
      <Animated.View
        className={`h-full w-[60%] items-center justify-center rounded-3xl ${
          isOn ? "bg-secondary" : "bg-black-200"
        } `}
        style={{ transform: [{ translateX }] }}
      >
        <Text
          className={`text-xs font-psemibold ${
            isOn ? "text-black-200" : "text-gray-100"
          }`}
        >
          {isOn ? "Yes" : "No"}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ToggleableSwitch;
