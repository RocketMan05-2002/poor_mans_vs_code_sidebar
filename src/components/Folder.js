import { useState } from "react"
import getFileEmoji from '../data/iconData'

export default function Folder({explorer , handleInsertNode}){
    const[expand,setExpand] = useState(false);
    const[showInput,setShowInput] = useState({
        visible:false,
        isFolder:null
    })

    const handleNewFolder = (e,isFolder) => {
        e.stopPropagation();
        setExpand(true);
        setShowInput({
            visible:true,
            isFolder
        })
    };

    const onAddFolder = (e) => {
        if(e.keyCode === 13 && e.target.value){
            //add logic
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
            setShowInput({...showInput,visible:false});
        }
    }
    if(explorer.isFolder){
        return <div>
        <div className="folder" onClick={()=>setExpand(!expand)}>
            <span>🗂️{explorer.name}</span>
            <div className="btns">
                <button onClick={(e)=>handleNewFolder(e,true)}>Folder+</button>
                <button onClick={(e)=>handleNewFolder(e,false)}>File+</button>
            </div>
        </div>
        <div style={{ display: expand?"block":"none", paddingLeft: 25 }}>
        {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "🗂️" : "📊"}</span>
              <input
                type="text"
                placeholder="enter name.."
                className="inputContainer_input"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={onAddFolder}
              />
            </div>
            )}
            {
                explorer.items.map((exp,ind)=>{
                    return <Folder explorer={exp} key={ind} handleInsertNode={handleInsertNode}  />
                })
            }
        </div>
    </div>
    }else{
        return <span className="file">{getFileEmoji(explorer.name)} {explorer.name}</span>;
    }
}