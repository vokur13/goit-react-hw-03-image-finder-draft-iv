import { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

// - Модальное окно (componentDidMount и componentWillUnmount)
//   - Проблема z-index, как решать без костылей (порталы)
//   - Слушатель на keydown для Escape
//   - Слушатель на клик по Backdrop

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackDropClic = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return createPortal(
      <div className="Overlay" onClick={this.handleBackDropClic}>
        <div className="Modal">
          {this.props.children}
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

{
  /* <div class="overlay">
  <div class="modal">
    <img src="" alt="" />
  </div>
</div>; */
}
