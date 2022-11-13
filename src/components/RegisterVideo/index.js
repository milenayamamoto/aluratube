import React from 'react'
import { useRouter } from 'next/router'
import { StyledRegisterVideo } from './styles'
import { videoService } from '../../../src/services/videoService'

function useForm(props) {
	const [values, setValues] = React.useState(props.initialValues.values)
	const [formErrors, setFormErrors] = React.useState(props.initialValues.errors)

	const matchYoutubeUrl =
		/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/

	const isFormValid =
		Object.keys(formErrors).every((key) => formErrors[key] === '') &&
		Object.keys(values).every((key) => values[key] !== '')

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
		isFormValid,
		handleChange: (e) => {
			setValues({ ...values, [e.target.name]: e.target.value })
			handleValidation(e.target.name, e.target.value)
		},
		clearForm() {
			setValues({})
		},
	}
}

function getThumbnail(url) {
	return `https://img.youtube.com/vi/${url.split('v=')[1]}/hqdefault.jpg`
}

export default function RegisterVideo() {
	const router = useRouter()
	const service = videoService()

	const formSignUp = useForm({
		initialValues: {
			values: {
				title: '',
				url: '',
			},
			errors: {
				title: '',
				url: '',
			},
		},
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

						service
							.addVideo()
							.insert({
								title: formSignUp.values.title,
								url: formSignUp.values.url,
								thumb: getThumbnail(formSignUp.values.url),
								playlist: 'jogos',
							})
							.then((res) => {
								console.log({ res })
							})
							.catch((err) => {
								console.log(err)
							})
							.finally(setTimeout(() => router.reload(), 2000))
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
						{formSignUp?.values?.url && (
							<>
								<h3 style={{ marginTop: '16px', marginBottom: '8px' }}>
									Thumbnail
								</h3>
								<img src={getThumbnail(formSignUp.values.url)} style={{}} />
							</>
						)}
						<button
							type='submit'
							disabled={!formSignUp.isFormValid}
							style={{ marginTop: '16px' }}
						>
							Adicionar
						</button>
					</div>
				</form>
			)}
		</StyledRegisterVideo>
	)
}
