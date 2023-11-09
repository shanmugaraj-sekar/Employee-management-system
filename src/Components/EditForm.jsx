import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "../style/componentHolder.css";

export default function EditForm({ employeeId }) {
  const idEmployee = employeeId;
  const [editedData, setEditedData] = useState({
    id: "",
    name: "",
    code: "",
    gender: "",
  });

  const fetchApi = "http://localhost:3005/employees/" + idEmployee;

  useEffect(() => {
    fetch(fetchApi)
      .then((res) => res.json())
      .then((data) => {
        setEditedData({
          id: data.id,
          name: data.name,
          code: data.code,
          gender: data.gender,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [fetchApi]);

  const handelSave = () => {
    fetch(fetchApi, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  return (
    <div className="form">
      <form>
        <TextField
          label="Name"
          variant="standard"
          value={editedData.name}
          onChange={(e) =>
            setEditedData({ ...editedData, name: e.target.value })
          }
        />
        <TextField
          label="Employee Code"
          variant="standard"
          value={editedData.code}
          onChange={(e) =>
            setEditedData({ ...editedData, code: e.target.value })
          }
        />
        <br></br>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={editedData.gender}
            onChange={(e) =>
              setEditedData({ ...editedData, gender: e.target.value })
            }
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        <div>
          <Button variant="contained" color="success" onClick={handelSave}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
