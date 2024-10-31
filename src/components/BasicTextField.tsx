import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface BasicTextFieldProps {
  label: string;
  placeholder?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: "text" | "number" | "email" | "password";
}

export default function BasicTextField({ 
  label,
  placeholder = "",
  value,
  onChange,
  type = "text"
}: BasicTextFieldProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // typeがnumberの場合、数値のバリデーションを追加
    if (typeof value === "number") {
      const numericValue = Number(inputValue);
      if (!isNaN(numericValue)) {
        onChange(numericValue);
      }
    } else {
      onChange(inputValue);
    }
  };

  return (
    <Box sx={{ minWidth: "120px" }}>
      <TextField
        fullWidth
        label={label}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        type={type}
      />
    </Box>
  );
}
