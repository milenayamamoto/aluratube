import React from 'react'
import config from '../config.json'
import styled from 'styled-components'

import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'
import { videoService } from '../src/services/videoService'

function HomePage() {
	const service = videoService()
	const [searchValue, setSearchValue] = React.useState('')
	const [playlists, setPlaylists] = React.useState({})

	React.useEffect(() => {
		service.getAllVideos().then((res) => {
			const newPlaylists = {}

			res.data?.forEach((video) => {
				if (!newPlaylists[video.playlist]) newPlaylists[video.playlist] = []
				newPlaylists[video.playlist] = [video, ...newPlaylists[video.playlist]]
			})
			setPlaylists(newPlaylists)
		})
	}, [])

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
					playlists={playlists}
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
										<a href={video.url} key={video.url} target='_blank'>
											<img src={video.thumb} />
											<span>{video.title}</span>
										</a>
									)
								})}
						</div>
					</section>
				)
			})}
			<div className='favorites'>
				<h2>AluraTubes Favoritos</h2>
				<div>
					{props.favorites &&
						props.favorites?.map((favorite) => {
							return (
								<a
									key={favorite}
									href={`https://github.com/${favorite}`}
									target='_blank'
								>
									<img src={`https://github.com/${favorite}.png`} />
									<p>@{favorite}</p>
								</a>
							)
						})}
				</div>
			</div>
		</StyledTimeline>
	)
}
