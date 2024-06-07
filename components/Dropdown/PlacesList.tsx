import React from "react";
import { TouchableOpacity } from "react-native";
import { MapPinIcon } from "react-native-heroicons/outline";
import Text from "@/components/Text";
import Box from "../Box";

interface PlacesListProps {
  places: any[];
  onSelectPlace: (loc: any) => void;
}

const PlacesList: React.FC<PlacesListProps> = ({ places, onSelectPlace }) => {
  return (
    <Box
      style={{
        position: "absolute",
        width: "90%",
        flex: 1,
        backgroundColor: "#d9d9d9",
        alignSelf: "center",
        top: 165,
        borderRadius: 24,
        zIndex: 1,
      }}
    >
      {places.map((loc: any, index: number) => {
        let showBorder = index + 1 !== places?.length;
        let borderStyle = showBorder
          ? { borderBottomWidth: 2, borderBottomColor: "#bdbdbd" }
          : {};
        return (
          <TouchableOpacity
            onPress={() => onSelectPlace(loc)}
            key={index}
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 0,
                paddingVertical: 18,
                paddingHorizontal: 16,
                marginBottom: 4,
              },
              borderStyle,
            ]}
          >
            <MapPinIcon size={20} color={"gray"} />
            <Text style={{ color: "black", fontSize: 16, marginLeft: 8 }}>
              {loc?.name} {loc?.country}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Box>
  );
};

export default PlacesList;
