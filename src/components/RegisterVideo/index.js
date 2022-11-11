import React from 'react'
import { StyledRegisterVideo } from './styles'

function useForm(props) {
	const [values, setValues] = React.useState(props.initialValues)
	const [formErrors, setFormErrors] = React.useState(props.initialValues.errors)

	const matchYoutubeUrl =
		/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/

	const handleValidation = (name, value) => {
		if (name === 'title') {
			if (value === undefined || value.trim() === '') {
				return setFormErrors({
					...formErrors,
					title: 'O título não pode estar em branco!',
				})
			} else {
				setFormErrors({ ...formErrors, title: '' })
			}
		}
		if (name === 'url') {
			if (value === undefined || value.trim() === '') {
				return setFormErrors({ url: 'O link não pode estar em branco!' })
			} else if (!value.match(matchYoutubeUrl)) {
				return setFormErrors({ url: 'Não é um link válido do Youtube!' })
			} else {
				setFormErrors({ ...formErrors, url: '' })
			}
		}
	}

	return {
		values,
		formErrors,
		handleChange: (e) => {
			setValues({ ...values, [e.target.name]: e.target.value })
			handleValidation(e.target.name, e.target.value)
		},
		clearForm() {
			setValues({})
		},
		getThumb: (videoUrl) => {
			const thumb = videoUrl?.split('?')[1]?.split('=')[1]
			return `https://img.youtube.com/vi/${thumb}/hqdefault.jpg`
		},
	}
}

export default function RegisterVideo() {
	const formSignUp = useForm({
		initialValues: {
			title: 'Frostpunk',
			url: 'https://www.youtube.com/watch?v=QsqatJxAUtk',
			errors: {
				title: '',
				url: '',
			},
		},
	})
	const [formVisible, setFormVisible] = React.useState(false)

	const thumbnail = formSignUp.getThumb(formSignUp?.values?.url)

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
						{formSignUp?.formErrors?.title && (
							<span
								style={{ fontSize: '11px', color: 'red', marginBottom: '8px' }}
							>
								{formSignUp.formErrors.title}
							</span>
						)}
						<input
							name='url'
							placeholder='URL'
							value={formSignUp.values.url}
							onChange={formSignUp.handleChange}
						/>
						{formSignUp?.formErrors?.url && (
							<span
								style={{ fontSize: '11px', color: 'red', marginBottom: '8px' }}
							>
								{formSignUp.formErrors.url}
							</span>
						)}
						{thumbnail && (
							<>
								<h3 style={{ marginTop: '16px', marginBottom: '8px' }}>
									Thumbnail
								</h3>
								<img src={thumbnail} style={{}} />
							</>
						)}
						<button type='submit' style={{ marginTop: '16px' }}>
							Adicionar
						</button>
					</div>
				</form>
			)}
		</StyledRegisterVideo>
	)
}
