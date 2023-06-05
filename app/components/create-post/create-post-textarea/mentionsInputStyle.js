/* eslint-disable import/no-anonymous-default-export */
export default {
	control: {
		backgroundColor: '#fff',
		fontSize: 16,
	},

	'&multiLine': {
		control: {
			fontFamily: 'Open Sans, sans-serif',
		},
		highlighter: {
			padding: 7,
			border: '1px solid transparent',
		},
		input: {
			padding: 10,
			border: 'none',
			fontFamily: 'Open Sans, sans-serif',
			fontSize: 14,
		},
	},

	'&singleLine': {
		display: 'inline-block',
		width: 180,

		highlighter: {
			padding: 1,
			border: '2px inset transparent',
		},
		input: {
			padding: 1,
			border: 'none',
		},
	},

	suggestions: {
		list: {
			backgroundColor: 'white',
			fontSize: 14,
			width: '250px',
			zIndex: 9999,
			boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
			overflowY: 'auto',
			height: 'fit-content',
			maxHeight: '300px',
			overflowX: 'hidden',
		},
		item: {
			width: '250px',
			borderBottom: '1px solid #dadada',
			'&focused': {
				backgroundColor: '#cee4e5',
				// color: '#20b46a',
			},
		},
	},
};
