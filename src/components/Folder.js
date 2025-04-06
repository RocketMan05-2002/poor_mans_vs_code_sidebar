import { useState } from "react";

export default function Folder({explorer, handleInsertNode}){
    const[expand,setExpand] = useState(false);
    const[showInput,setShowInput] = useState({
        visible:false,
        isFolder:null
    })

    function handleNewFolder(e,isFolder){
        e.stopPropagation();
        setExpand(true);
        setShowInput({visible:true,isFolder});
    }

    function onAddFolder(e){
        if(e.keyCode === 13 && e.target.value){
            handleInsertNode(explorer.id,e.target.value,showInput.isFolder);
            setShowInput({...showInput,visible:false});
        }
    }

    if(explorer.isFolder){
        return (
            <div className="wrapper">
                <div className="folder" onClick={()=>setExpand(!expand)}>
                    <span>📂{explorer.name}</span>
                    <div>
                        <button onClick={(e)=>handleNewFolder(e,true)}>Folder+</button>
                        <button onClick={(e)=>handleNewFolder(e,false)}>File+</button>
                    </div>
                </div>
                <div style={{ display:expand?"block":"none",paddingLeft:25 }}>
                    {
                        showInput.visible && <div className="input-container">
                            <span>{showInput.isFolder?"📂":"📄"}</span>
                            <input
                            type="text"
                            autoFocus
                            onBlur={()=>setShowInput({...showInput,visible:false})}
                            onKeyDown={onAddFolder}
                            />
                        </div>
                    }
                    {
                        explorer.items.map((exp,ind)=>{
                            return <Folder key={ind} explorer={exp} handleInsertNode={handleInsertNode} />
                        })
                    }
                </div>
            </div>
        )
    }else{
        return <span className="file">📄{explorer.name}</span>
    }
}