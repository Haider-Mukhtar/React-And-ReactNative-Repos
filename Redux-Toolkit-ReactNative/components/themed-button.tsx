import { Pressable, Text } from "react-native";
import { useTheme } from "../components/theme-context";

export default function ThemedButton({ title, onPress } : { title: string, onPress: () => void }) {
  const { colors } = useTheme();
  
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.primary : colors.secondary,
        padding: 15,
        borderRadius: 8,
        opacity: pressed ? 0.8 : 1,
      })}
    >
      <Text style={{ color: colors.text, textAlign: "center" }}>
        {title}
      </Text>
    </Pressable>
  );
}