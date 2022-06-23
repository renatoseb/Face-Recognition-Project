import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    height: 60,
    lineHeight: '60px',
    fontSize: '26px',
}))

export default Item;