import useOverlayClick from './../../hooks/useOverlayClick.js';
import useEscapeKey from './../../hooks/useEscapeKey.js';

import './InfoTooltip.css';

import successIcon from './../../images/icon-success.svg';
import failIcon from './../../images/icon-fail.svg';

export default function InfoTooltip({ title, isSuccess, isOpen, onClose }) {
  useOverlayClick(onClose, 'modal');
  useEscapeKey(onClose);

  return (
    <div className={`modal modal_type_info ${isOpen && 'modal_opened'}`}>
      <div className="modal__content modal__content_type_info">
        <span
          style={{ backgroundImage: `url("${!isSuccess ? failIcon : successIcon}")` }}
          className="modal__icon"
        ></span>
        <h2 className="modal__title modal__title_location_info">{title}</h2>
        <button type="button" className="modal__close" onClick={onClose}></button>
      </div>
    </div>
  );
}
