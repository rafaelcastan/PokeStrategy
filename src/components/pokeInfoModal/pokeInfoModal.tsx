import Modal from 'react-modal';

export function PokeInfoModal(){

    return(
        <Modal isOpen={true} 
               overlayClassName="react-modal-overlay"
               className="react-modal-content"
        >
        </Modal>
    )
}