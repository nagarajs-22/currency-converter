import { Container } from '@mui/material'
import CurrencyConverter from './components/CurrencyConverter'

export default function App() {
  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <CurrencyConverter />
    </Container>
  )
}