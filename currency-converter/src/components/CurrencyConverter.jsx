import {
  Paper,
  TextField,
  Select,
  MenuItem,
  Typography,
  IconButton,
  CircularProgress,
  Box
} from '@mui/material'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { useEffect, useState } from 'react'
import { fetchCurrencies, convertCurrency  } from '../services/api'

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState({});
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(1)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch currencies
  useEffect(() => {
  const loadCurrencies = async () => {
    const data = await fetchCurrencies();

    setCurrencies(data);

    setFrom(data[0].iso_code);
    setTo(data[1].iso_code);
  };

  loadCurrencies();
}, []);
  // Debounced conversion
  useEffect(() => {
    const handler = setTimeout(() => {
      convert()
    }, 500)

    return () => clearTimeout(handler)
  }, [amount, from, to])

const convert = async () => {
  try {
    setLoading(true);
    setError("");

    const result = await convertCurrency(from, to, amount);

    setResult(result);

  } catch (err) {
    setError("Conversion failed");
  } finally {
    setLoading(false);
  }
};

  const handleSwap = () => {
    setFrom(to)
    setTo(from)
  }

  if (!currencies.length) {
  return <CircularProgress />;
}
  return (
    <Paper sx={{ p: 4, backgroundColor: "lightblue" }} elevation={3}>
      <Typography variant="h5" gutterBottom>
        Currency Converter
      </Typography>
	{error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      <TextField
        fullWidth
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <Select fullWidth value={from} onChange={(e) => setFrom(e.target.value)}>
        { currencies.map((cur) => (
        <MenuItem key={cur.iso_code} value={cur.iso_code}>
        {cur.iso_code}
        </MenuItem>
        )) }
        </Select>

        <IconButton onClick={handleSwap}>
          <SwapHorizIcon />
        </IconButton>

        <Select fullWidth value={to} onChange={(e) => setTo(e.target.value)}>
        {currencies.map((cur) => (
        <MenuItem key={cur.iso_code} value={cur.iso_code}>
        {cur.iso_code}
        </MenuItem>
        ))}
        </Select>
      </Box>

      {loading ? (
        <CircularProgress size={24} />
      ) : (
        result && (
          <Typography variant="h6">
            {amount} {from} = {result} {to}
          </Typography>
        )
      )}
    </Paper>
  )
}
