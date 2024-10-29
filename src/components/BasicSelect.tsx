import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface BasicSelectProps {
  options: { value: string | number; label: string }[];
  onChange: (value: string) => void;
  value: string;
}

export default function BasicSelect({ options, onChange, value }: BasicSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          id="custom-select"
          value={value}
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return <span style={{ color: 'gray' }}>選択</span>;
            }
            return options.find(opt => opt.value === selected)?.label;
          }}
          sx={{
            borderRadius: 1,
          }}
          MenuProps={{
            PaperProps: {
              style: {
                boxShadow: 'none',
                border: '0.5px solid rgba(0, 0, 0, 0.1)',
                borderRadius: 5,
              },
            },
          }}
        >
          <MenuItem value="">
            <span>指定なし</span>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}