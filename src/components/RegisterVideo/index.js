import React from 'react'
import { StyledRegisterVideo } from './styles'

function useForm(props) {
	const [values, setValues] = React.useState(props.initialValues)

	return {
		values,
		handleChange: (e) => {
			setValues({ ...values, [e.target.name]: e.target.value })
		},
		clearForm() {
			setValues({})
		},
	}
}

export default function RegisterVideo() {
	const formSignUp = useForm({
		initialValues: { title: 'Frostpunk', url: 'pipipipopopó' },
	})
	const [formVisible, setFormVisible] = React.useState(false)

	return (
		<StyledRegisterVideo>
			<button className='add-video' onClick={() => setFormVisible(true)}>
				+
			</button>
			{formVisible && (
				<form
					onSubmit={(e) => {
						e.preventDefault()
						setFormVisible(false)
						formSignUp.clearForm()
					}}
				>
					<div>
						<button
							type='button'
							className='close-modal'
							onClick={() => setFormVisible(false)}
						>
							x
						</button>
						<input
							name='title'
							placeholder='Título do vídeo'
							value={formSignUp.values.title}
							onChange={formSignUp.handleChange}
						/>
						<input
							name='url'
							placeholder='URL'
							value={formSignUp.values.url}
							onChange={formSignUp.handleChange}
						/>
						<button type='submit'>Cadastrar</button>
					</div>
				</form>
			)}
		</StyledRegisterVideo>
	)
}
