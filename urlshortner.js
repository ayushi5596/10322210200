import React, {useState} from "react";
import{
    Box,
    Button,
    TextField,
    Typography,
    paper,
    Strack,
} from "@nui/material";
import logEvent from "../utils/logger";
function urlshortner(){
    const [ input, setInputs] = useState([
        {longUrl: "" , validity: "" , shortCode: "" , error: ""},

    ]);
    const handleChannge = (index , field , value)=>{
        const updated = [...inputs];
        updated[index][field] = value;
        setInputs(updated);

    };
    const addInput = () =>{
        if(input.length() >= 5) return;
        setInputs([
            ...inputs,
            {longUrl: "", validity: "", shortcode: "", error: ""},
        ]);

    };
    const handleSubmit =async () => {
        const errors = [];
        const checked = inputs.map((input, idx) => {

            const url = input.longUrl.trim();
            const validity = input.validity.trim();
            const shortCode = input.shortCode.trim();
            const validation = {};
            try{
                new URL(url);
            } catch{
                validation.error = "invalid URL";
                errors.push('input ${idx +1}: invalid URL');
                return{...input, ...validation};

            }
            if (validity && (!/^[0-9]+$/.test(validity)|| parsrInt(validity <= 0))){
                validation.error = "validity is positive ";
                errors.push(`input ${idx +1}: validity is positive`);
                return { ...input, ...validation};
            }
            validation.error = "";
            return { ...input , ...validation};
        });
        setInputs(checked);
        if(errors.length > 0){
            await logEvent("error", "validation error", {errors});
            return;

        }
        awaitlogEvent("info", "validation error",{checked});
        alert ("inputs validated");

    };
    return(
        <paper elevation = {3} sx = {{ p:4}}>
            <Typography varient = "h4" gutterBottom>
                URL Shortener
            </Typography>
            {inputs.map((input,idx) => 
            <Box key = {idx} sx = {{mb: 3 ,borderbottom: "1px solid #ccc", pb:2 }}>
                <Typography variant = "h6" gutterBottom>Entry (idx+1)</Typography>
                <stack spacing = {2} direction={{xs: "column", sm: "row"}}>
                    <TextField 
                    label="Long URL"
                    value = { input.longUrl}
                    onChange = {(e) => handleChannge(idx, "longUrl" , e.target.value)}
                    fullWidth
                    error={Boolean(input.error)}
                    helperText = {input.error}>

                    </TextField>
                    <TextField
                    label="Validity (min)"
                    value = {input.validity}
                    onChange = {(e) => handleChannge(idx, "validity", e.target.value)}
                    fullWidth>

                    </TextField>
                    
                </stack>
            </Box>
            )}
            <Box display="flex" justifyContent="space-between">
        <Button onClick={addInput} variant="outlined" disabled={inputs.length >= 5}>
          + Add more
        </Button>

        <Button onClick={handleSubmit} variant="contained">
          Submit URLs
        </Button>
      </Box>
        </paper>
    )   
}

export default urlshortner;
