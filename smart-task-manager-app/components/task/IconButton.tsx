import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import { Feather } from "@expo/vector-icons";

interface Props {
  icon: any;
  color: string;
  onPress?: () => void;
  backgroundColor?: string;   
}

export default function IconButton({
  icon,
  color,
  onPress,
  backgroundColor,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: backgroundColor || "#EEF2FF" },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Feather name={icon} size={16} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});