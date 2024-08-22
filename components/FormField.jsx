import { View, Text, TextInput } from "react-native";
import React from "react";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  titleStyles,
  ...props
}) => {
  return (
    <View className={`${otherStyles} space-y-2`}>
      <Text className={`text-gray-100 text-base font-pmedium px-1  ${titleStyles}`}>{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 focus:border-secondary items-center flex-row">
        <TextInput 
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          onChangeText={handleChangeText}
          placeholderTextColor="#7b7b8b"
        />
      </View>
    </View>
  );
};

export default FormField;
