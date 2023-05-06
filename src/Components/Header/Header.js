import './Header.css';
import axios from '../../axios';
import { useState } from 'react';
import Modal from './Modal/Modal';
function Header() {
	const [images, setImages] = useState(null);
	const [value, setValue] = useState('');
	const [error, setError] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const surpriseOptions = [
		'white dog pink birthday hat',
		'man in yellow suit',
		'big red hamster',
	];

	const supriseMe = () => {
		setValue(
			surpriseOptions[Math.floor(Math.random() * surpriseOptions.length)]
		);
	};

	const getImages = async () => {
		setImages(null);
		if (value === '') {
			setError('Must have a search term');
		} else {
			setError(null);
			try {
				const resImages = await axios.post(
					'/images',
					JSON.stringify({ message: value })
				);
				console.log(resImages.data);
				setImages(resImages.data);
			} catch (error) {
				console.error(error);
			}
		}
	};

	const uploadImage = async (e) => {
		const formData = new FormData();
		formData.append('file', e.target.files[0]);
		setSelectedImage(e.target.files[0]);
		try {
			const resUploadImage = await axios.post('/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
			console.log(resUploadImage);
		} catch (error) {
			console.error(error);
		}
	};

	const generateVariations = async () => {
		try {
			const resVariations = await axios.post('/variations');
			console.log(resVariations);
			setImages(resVariations.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<header className='header wrapper'>
			<div className='header__container'>
				<h1 className='header__title'>
					<span className='header__title--grandient'>AI </span>
					Image Generator
				</h1>
				<p className='header__text'>
					start with a detailed description{' '}
					<span className='header__text--suprise' onClick={supriseMe}>
						Surprise me
					</span>
				</p>
				<div className='header__inputBox'>
					<input
						value={value}
						type='text'
						id='input'
						placeholder='a cat submarine chimera, digital art...'
						onChange={(e) => {
							setValue(e.target.value);
						}}
					/>

					<button className='inputBox__btn' onClick={getImages}>
						Generate
					</button>
				</div>
				{error && <p className='error__message'>{error}</p>}
				<label htmlFor='file' className='header__text-label'>
					Or, <span className='header__text--upload'>upload</span> an image to
					edit
				</label>
				<input
					type='file'
					id='file'
					accept='image/*'
					onChange={(e) => {
						uploadImage(e);
					}}
					hidden
				/>
			</div>
			<div className='results'>
				<h2 className='results--title'>Result</h2>
				<div className='results--image-container'>
					{images?.map((image, _index) => (
						<div className='image__box'>
							<img src={image.url} alt={`Veriosn nr: ${_index}`} key={_index} />
						</div>
					))}
				</div>
			</div>
			{selectedImage && (
				<Modal
					selectedImage={selectedImage}
					setSelectedImage={setSelectedImage}
					generateVariations={generateVariations}
				/>
			)}
		</header>
	);
}

export default Header;
