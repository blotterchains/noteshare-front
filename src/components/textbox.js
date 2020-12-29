import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox(props) {
    if(props.list){
        return (
            <Autocomplete
              id="combo-box-demo"
              options={props.list}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              renderInput={(params) => <TextField value={props.value} onChange={props.kk} {...params} label="Combo box" variant="outlined" />}
            />
          );
    }
  
}