import React from 'react';

import './SidePanel.css';

const SidePanel = ({ isOpen, close, repo = {}, children }) => {
  const handleClickOutside = (event) => {
    if (event.target.classList.contains('SidePanelOverlay')) {
      close();
    }
  }

  if (isOpen) {
    document.body.classList.add('side-open');

    return (
      <div className="SidePanelOverlay" onClick={handleClickOutside}>
        <div className="SidePanel">
          <div className="SidePanel-header">
            <button className="SidePanel-close" onClick={close}>
              <img src="/static/assets/x.svg" />
            </button>
            <h2>{ repo.full_name }</h2>
          </div>
          { children }
          <div className="SidePanel-footer">
            <button>Newer</button>
            <button>Older</button>
          </div>
        </div>
      </div>
    );
  } else {
    document.body.classList.remove('side-open');
  }

  return null;
}

export default SidePanel;