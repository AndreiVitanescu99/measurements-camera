import React from "react";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import personsData from "../data/data-test/persons.json";

const UserSelect = ({ selectedId, onChange }) => {
  
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="user-select-label">Selectează persoana</InputLabel>
      <Select
        labelId="user-select-label"
        value={selectedId}
        onChange={onChange}
        label="Selectează persoana"
      >
        {personsData.persons.map((person) => (
          <MenuItem key={person.id} value={person.id}>
            {person.personData.firstName} {person.personData.lastName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserSelect;
