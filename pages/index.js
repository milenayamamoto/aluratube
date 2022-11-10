import React from 'react'
import styled from 'styled-components'

import config from '../config.json'

import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'

function HomePage() {
	const [searchValue, setSearchValue] = React.useState('')

	return (
		<>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
				}}
			>
				<Menu searchValue={searchValue} setSearchValue={setSearchValue} />
				<Header />
				<Timeline
					searchValue={searchValue}
					playlists={config.playlists}
					favorites={config.favorites}
				/>
			</div>
		</>
	)
}

export default HomePage

const StyledHeader = styled.div`
	background-color: ${({ theme }) => theme.backgroundLevel1};
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

const StyledBanner = styled.div`
	background-image: url(${({ bg }) => bg});
	height: 230px;
`

function Header() {
	return (
		<StyledHeader>
			<StyledBanner bg={config.background} />

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

function Timeline({ searchValue, ...props }) {
	const playlistNames = Object.keys(props.playlists)

	return (
		<StyledTimeline>
			{playlistNames.map((playlistName) => {
				const videos = props.playlists[playlistName]

				return (
					<section key={playlistName}>
						<h2>{playlistName}</h2>
						<div>
							{videos
								.filter((video) => {
									const titleNormalized = video.title.toLowerCase()
									const searchValueNormalized = searchValue.toLowerCase()

									return titleNormalized.includes(searchValueNormalized)
								})
								.map((video) => {
									return (
										<a href={video.url} key={video.url}>
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
									key={favorite}
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
