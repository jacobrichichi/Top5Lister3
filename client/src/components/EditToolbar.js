import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    let undoButtonClass = "top5-button";
    let redoButtonClass = "top5-button";
    let closeButtonClass = "top5-button";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.currentList===null) {
        editStatus = true;
        closeButtonClass += "-disabled"
    }

    if(!store.hasTransactionToUndo()){
        undoButtonClass += "-disabled";
    }

    if(!store.hasTransactionToRedo()){
        redoButtonClass += "-disabled";
    }

    return (
        <div id="edit-toolbar">
            <div
                disabled={editStatus}
                id='undo-button'
                onClick={handleUndo}
                className={undoButtonClass}>
                &#x21B6;
            </div>
            <div
                disabled={editStatus}
                id='redo-button'
                onClick={handleRedo}
                className={redoButtonClass}>
                &#x21B7;
            </div>
            <div
                disabled={editStatus}
                id='close-button'
                onClick={handleClose}
                className={closeButtonClass}>
                &#x24E7;
            </div>
        </div>
    )
}

export default EditToolbar;