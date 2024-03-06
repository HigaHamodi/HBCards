import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/ROUTES";

const FilterComponent = () => {
  const [txt, setTxt] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setTxt(searchText);
    navigate(`${ROUTES.HOME}?filter=${searchText}`);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={txt}
        onChange={handleInputChange}
      />
    </Search>
  );
};

export default FilterComponent;
