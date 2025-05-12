import * as React from "react";
import { TextField, Menu, MenuItem, IconButton, Box } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const presetOptions = [
  { label: "All Time", value: "allTime" },
  { label: "Last Month", value: "lastMonth" },
  { label: "Last 3 Months", value: "last3Months" },
  { label: "Custom Range", value: "custom" },
];

function getPresetRange(preset) {
  const now = new Date();
  switch (preset) {
    case "lastMonth":
      return [
        new Date(now.getFullYear(), now.getMonth() - 1, 1),
        new Date(now.getFullYear(), now.getMonth(), 0),
      ];
    case "last3Months":
      return [
        new Date(now.getFullYear(), now.getMonth() - 2, 1),
        now,
      ];
    case "allTime":
      return [null, null];
    default:
      return [null, null];
  }
}

export default function DashboardDateRangeSelector({ onChange }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedPreset, setSelectedPreset] = React.useState("allTime");
  const [dateRange, setDateRange] = React.useState(getPresetRange("allTime"));
  const [showPicker, setShowPicker] = React.useState(false);

  const handleMenuOpen = event => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset);
    handleMenuClose();
    if (preset !== "custom") {
      const range = getPresetRange(preset);
      setDateRange(range);
      onChange && onChange(range, preset);
      setShowPicker(false);
    } else {
      setShowPicker(true);
    }
  };

  const handleRangeChange = (index, date) => {
    const newRange = [...dateRange];
    newRange[index] = date;
    setDateRange(newRange);
    onChange && onChange(newRange, "custom");
  };

  return (
  
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        mt: 2,
        pr: 3,
        position: "relative",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            value={
              dateRange[0] && dateRange[1]
                ? `${dateRange[0].toLocaleDateString()} - ${dateRange[1].toLocaleDateString()}`
                : "All Time"
            }
            InputProps={{
              readOnly: true,
              endAdornment: (
                <IconButton onClick={handleMenuOpen}>
                  <CalendarTodayIcon />
                </IconButton>
              ),
            }}
            variant="outlined"
            size="small"
            sx={{ minWidth: 220, maxWidth: 320 }} 
          />
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {presetOptions.map((option) => (
              <MenuItem
                key={option.value}
                selected={selectedPreset === option.value}
                onClick={() => handlePresetSelect(option.value)}
              >
                {option.label}
              </MenuItem>
            ))}
          </Menu>
          {showPicker && (
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <DatePicker
                label="Start"
                value={dateRange[0]}
                onChange={(date) => handleRangeChange(0, date)}
                maxDate={dateRange[1] || undefined}
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ minWidth: 140 }} />
                )}
              />
              <Box sx={{ mx: 1 }}> to </Box>
              <DatePicker
                label="End"
                value={dateRange[1]}
                onChange={(date) => handleRangeChange(1, date)}
                minDate={dateRange[0] || undefined}
                renderInput={(params) => (
                  <TextField {...params} size="small" sx={{ minWidth: 140 }} />
                )}
              />
            </Box>
          )}
        </Box>
      </LocalizationProvider>
    </Box>
  );
}