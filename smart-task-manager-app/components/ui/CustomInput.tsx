import {
  TextInput,
  StyleSheet,
  TextInputProps,
  View,
  Text,
} from "react-native";
import { useState } from "react";

interface Props extends TextInputProps {
  containerStyle?: any;
  label: string;
}

export default function CustomInput({
  style,
  containerStyle,
  multiline,
  label,
  onFocus,
  onBlur,
  ...props
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        {...props}
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.textArea,
          isFocused && styles.focusedInput,
          style,
        ]}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus && onFocus(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur && onBlur(e);
        }}
        placeholderTextColor="#9ca3af"
        textAlignVertical={multiline ? "top" : "center"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: "#111827",
    backgroundColor: "#ffffff",
  },
  focusedInput: {
    borderColor: "#4f46e5",
  },
  textArea: {
    height: 110,
  },
});