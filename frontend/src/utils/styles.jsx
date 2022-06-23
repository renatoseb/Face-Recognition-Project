
const boxStyleCols = (height, width, inlineBlock = true) => {
	return {
		width: width,
		height: height,
		display: inlineBlock ? 'inline-block' : 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		p: 1,
		mx: 1,
		bgcolor: (theme) =>
			theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
		color: (theme) =>
			theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
		border: '1px solid',
		borderColor: (theme) =>
			theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
		borderRadius: 2,
		fontSize: '0.875rem',
		fontWeight: '700',
		textAlign: 'center',
		margin: '0px'
	}
}

const boxStyleRow = (height) => {
	return ({
		// width: '25%',
		height: height,
		p: 1,
		bgcolor: (theme) =>
			theme.palette.mode === 'dark' ? '#101010' : 'grey.100',
		color: (theme) =>
			theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
		border: '1px solid',
		borderColor: (theme) =>
			theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
		borderRadius: 2,
		fontSize: '0.875rem',
		fontWeight: '700',
		textAlign: 'center',
		marginBottom: '10px',
	})
}

export { boxStyleCols, boxStyleRow };