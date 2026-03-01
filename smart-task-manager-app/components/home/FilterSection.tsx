import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";

interface Props {
  title: string;
  icon: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  getIcon?: (value: string) => string | undefined;
}

const STATUS_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  Pending:     { color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" },
  "In Progress": { color: "#3B82F6", bg: "#EFF6FF", border: "#BFDBFE" },
  Completed:   { color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0" },
  Low:         { color: "#10B981", bg: "#ECFDF5", border: "#A7F3D0" },
  Medium:      { color: "#F59E0B", bg: "#FFFBEB", border: "#FDE68A" },
  High:        { color: "#EF4444", bg: "#FEF2F2", border: "#FECACA" },
};

export default function FilterSection({
  title,
  icon,
  options,
  selected,
  onSelect,
  getIcon,
}: Props) {
  return (
    <>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionIcon}>
          <Feather name={icon as any} size={13} color="#4f46e5" />
        </View>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>

      {/* Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {options.map((item) => {
          const iconName = getIcon ? getIcon(item) : undefined;
          const isActive = selected === item;
          const themed = STATUS_COLORS[item];

          return (
            <TouchableOpacity
              key={item}
              activeOpacity={0.75}
              onPress={() => onSelect(item)}
              style={[
                styles.filterBtn,
                isActive && themed
                  ? { backgroundColor: themed.bg, borderColor: themed.border }
                  : isActive
                  ? styles.activeFilterFallback
                  : styles.filterBtnDefault,
              ]}
            >
              {iconName && (
                <View style={[
                  styles.iconWrap,
                  { backgroundColor: isActive && themed ? themed.color + "22" : "#E2E8F0" },
                ]}>
                  <Ionicons
                    name={iconName as any}
                    size={12}
                    color={isActive && themed ? themed.color : "#94a3b8"}
                  />
                </View>
              )}

              <Text
                style={[
                  styles.filterText,
                  isActive && themed
                    ? { color: themed.color, fontWeight: "700" }
                    : isActive
                    ? styles.activeFilterTextFallback
                    : styles.filterTextDefault,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  /* ── Section Header ── */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
    marginBottom: 10,
  },
  sectionIcon: {
    width: 24,
    height: 24,
    borderRadius: 7,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
    letterSpacing: -0.2,
  },

  /* ── Pills ── */
  filterRow: {
    paddingRight: 10,
    paddingBottom: 2,
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1.5,
    gap: 6,
  },
  filterBtnDefault: {
    backgroundColor: "#F8FAFC",
    borderColor: "#E2E8F0",
  },
  activeFilterFallback: {
    backgroundColor: "#EEF2FF",
    borderColor: "#C7D2FE",
  },

  /* ── Icon inside pill ── */
  iconWrap: {
    width: 20,
    height: 20,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  /* ── Text ── */
  filterText: {
    fontSize: 13,
    fontWeight: "600",
  },
  filterTextDefault: {
    color: "#64748b",
  },
  activeFilterTextFallback: {
    color: "#4f46e5",
    fontWeight: "700",
  },
});