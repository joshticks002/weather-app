import React, { Dispatch, SetStateAction, useState } from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Box from "@/components/Box";

interface SearchInputProps {
  onSearch: (text: string) => void;
  showSearch: boolean;
  toggleSearch: Dispatch<SetStateAction<boolean>>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  toggleSearch,
  showSearch,
}) => {
  const handleSearchDebounced = (text: string) => {
    onSearch(text);
  };

  return (
    <Box style={{ height: "7%", marginHorizontal: 16, zIndex: 50 }}>
      <Box
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          borderRadius: 9999,
          backgroundColor: showSearch
            ? "rgba(255, 255, 255, 0.2)"
            : "transparent",
        }}
      >
        {showSearch ? (
          <TextInput
            onChangeText={handleSearchDebounced}
            placeholder="Search city"
            placeholderTextColor={"lightgray"}
            style={{
              paddingLeft: 24,
              paddingBottom: 4,
              height: 40,
              flex: 1,
              fontSize: 16,
              color: "white",
            }}
          />
        ) : null}
        <TouchableOpacity
          onPress={() => toggleSearch(!showSearch)}
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: 9999,
            padding: 12,
            margin: 4,
          }}
        >
          <MagnifyingGlassIcon size={25} color="white" />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default SearchInput;
