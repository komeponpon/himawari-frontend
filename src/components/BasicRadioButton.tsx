import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";

interface Option {
  value: string;
  label: string;
}

interface BasicRadioButtonProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  row?: boolean;
}

export default function BasicRadioButton({
  label,
  options,
  value,
  onChange,
  row = false
}: BasicRadioButtonProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row={row} value={value} onChange={handleChange}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
