import { useState, useRef } from 'react';
import './Modal.css';

function Modal({ selectedImage, setSelectedImage, generateVariations }) {
	const imageRef = useRef();
	const [error, setError] = useState(null);
	const closeModal = () => {
		setSelectedImage(null);
	};

	const checkSize = () => {
		if (imageRef.current.width === 256 && imageRef.current.height === 256) {
			generateVariations();
		} else {
			setError('Choose 256 x 256 image');
		}
	};

	return (
		<div className='resulte__modal'>
			<div className='resulte__modal-container'>
				<p className='modal__close' onClick={closeModal}>
					X
				</p>
				<img
					ref={imageRef}
					src={URL.createObjectURL(selectedImage)}
					alt='uploaded image'
				/>
				{error ? (
					<p className='modal__error'>{error}</p>
				) : (
					<p className='modal__info'>* Image must be 256 x 256</p>
				)}
				<button
					className='modal__btn'
					onClick={() => {
						checkSize();
						// closeModal();
					}}>
					Generate
				</button>
			</div>
		</div>
	);
}

export default Modal;
