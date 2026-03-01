import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface Props {
  value: string;
  onChange: (text: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <View
      style={[
        styles.searchWrapper,
        focused && styles.focusedBorder,
      ]}
    >
      <Feather name="search" size={18} color="#9ca3af" />

      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Search tasks..."
        placeholderTextColor="#9ca3af"
        style={styles.input}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChange("")}>
          <Ionicons name="close-circle" size={18} color="#9ca3af" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    height: 48,
  },

  focusedBorder: {
    borderColor: "#4f46e5",
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#1e293b",
  },
});