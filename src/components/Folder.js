import React, { useState } from "react";

const Folder = ({ handleInsertNode, explorer }) => {
  const [expand, setExpand] = useState(false);
  const [showinput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setShowInput({
      visible: true,
      isFolder,
    });
    setExpand(true);
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // add logic
      handleInsertNode(explorer.id, e.target.value, showinput.isFolder);
      setShowInput({ ...showinput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📂 {explorer.name}</span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>Folder+ </button>
            <button onClick={(e) => handleNewFolder(e, false)}>File+</button>
          </div>
        </div>
        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}
        >
          {showinput.visible && (
            <div className="inputContainer">
              <span>{showinput.isFolder ? "📂" : "📄"}</span>
              <input
                type="text"
                placeholder="enter name.."
                className="inputContainer_input"
                autoFocus
                onBlur={() => setShowInput({ ...showinput, visible: false })}
                onKeyDown={onAddFolder}
              />
            </div>
          )}
          {explorer.items.map((exp) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                explorer={exp}
                key={exp.id}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
};

export default Folder;
