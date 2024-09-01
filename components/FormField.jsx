import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  titleStyles,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value);

  // Handle text changes and call external handleChangeText if provided
  const onChangeText = (text) => {
    setInputValue(text);
    if (handleChangeText) {
      handleChangeText(text);
    }
  };

  return (
    <View className={`${otherStyles} space-y-2`}>
      <Text
        className={`text-gray-100 text-base font-pmedium px-1  ${titleStyles}`}
      >
        {title}
      </Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base z-0"
          value={inputValue}
          placeholder={placeholder}
          onChangeText={onChangeText}
          placeholderTextColor="#7b7b8b"
        />
        <TouchableOpacity onPress={() => setInputValue("")}>
          <Ionicons name="close-circle" size={20} color="#7b7b8b" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormField;
