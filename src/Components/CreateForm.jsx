import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "../style/componentHolder.css";

export default function CreateForm({ handleEditClose }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    code: "",
    gender: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const postApi = "http://localhost:3005/employees";

  const handleCreateSubmit = () => {
    fetch(postApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((formData) => {
      if (!formData.ok) {
        alert("something went wrong when updating form");
      } else {
        window.location.reload();
      }
    });
    console.log(formData);
  };

  return (
    <div>
      <form
        onSubmit={() => {
          handleCreateSubmit();
        }}
      >
        <div className="form">
          <TextField
            id="name"
            label="Name"
            variant="standard"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            id="code"
            name="code"
            label="Employee Code"
            variant="standard"
            value={formData.code}
            onChange={handleChange}
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="gender"
              id="gender"
              onChange={handleChange}
              value={formData.gender}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="others"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              handleEditClose();
              handleCreateSubmit();
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
