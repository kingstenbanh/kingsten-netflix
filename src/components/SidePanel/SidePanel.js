import React from 'react';

import './SidePanel.css';

const SidePanel = ({ isOpen, close, title = '', children }) => {
  const sidePanelOverlayClass = isOpen ? 'SidePanelOverlay open' : 'SidePanelOverlay';
  const sidePanelActive = isOpen ? 'SidePanel active' : 'SidePanel';
  document.body.style.overflow = isOpen ? 'hidden' : 'auto';

  const handleClickOutside = (event) => {
    if (event.target.classList.contains('SidePanelOverlay')) {
      close();
    }
  }

  return (
    <>
      <div className={sidePanelOverlayClass} onClick={handleClickOutside} />

      <div className={sidePanelActive}>
        <div className="SidePanel-header">
          <h2>{ title }</h2>

          <button 
            className="SidePanel-close" 
            onClick={close}
            role="button"
            aria-label="Close Side Panel"
          >
            <img src="/static/assets/x.svg" alt="Close Icon" />
          </button>
        </div>

        { children }
      </div>
    </>
  );
}

export default SidePanel;