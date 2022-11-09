import styled from 'styled-components'
import Image from 'next/image'

import config from '../config.json'
import { CSSReset } from '../src/components/CSSReset'

import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'

import banner from '../src/assets/banner.jpg'

function HomePage() {
	return (
		<>
			<CSSReset />
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
				}}
			>
				<Menu />
				<Header />
				<Timeline playlists={config.playlists} favorites={config.favorites} />
			</div>
		</>
	)
}

export default HomePage

const StyledHeader = styled.div`
	img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
	}
	.user-info {
		display: flex;
		align-items: center;
		width: 100%;
		padding: 16px 32px;
		gap: 16px;
	}
	.banner {
		border-radius: 0;
	}
`

function Header() {
	return (
		<StyledHeader>
			<div style={{ marginTop: '56px', position: 'relative' }}>
				<Image
					src={banner}
					alt='imagem mostrando a tela de um computador'
					width='1512'
					height='230'
					objectFit='cover'
					className='banner'
				/>
			</div>

			<section className='user-info'>
				<img src={`https://github.com/${config.github}.png`} />
				<div>
					<h2>{config.name}</h2>
					<p>{config.job}</p>
				</div>
			</section>
		</StyledHeader>
	)
}

function Timeline(props) {
	const playlistNames = Object.keys(props.playlists)

	console.log({ props })
	return (
		<StyledTimeline>
			{playlistNames.map((playlistName) => {
				const videos = props.playlists[playlistName]

				return (
					<section>
						<h2>{playlistName}</h2>
						<div>
							{videos.map((video) => {
								return (
									<a href={video.url}>
										<img src={video.thumb} />
										<span>{video.title}</span>
									</a>
								)
							})}
						</div>
					</section>
				)
			})}
			<div style={{ marginTop: '28px', marginBottom: '16px' }}>
				<h2>AluraTubes Favoritos</h2>
				<div style={{ display: 'flex', gap: '8px' }}>
					{props.favorites &&
						props.favorites?.map((favorite) => {
							return (
								<div
									style={{
										display: 'flex',
										flexDirection: 'column',
										alignItems: 'center',
									}}
								>
									<img
										src={`https://github.com/${favorite}.png`}
										style={{
											width: '100px',
											height: '100px',
											borderRadius: '50%',
										}}
									/>
									<p style={{ marginTop: '8px' }}>@{favorite}</p>
								</div>
							)
						})}
				</div>
			</div>
		</StyledTimeline>
	)
}
