import Modal from 'react-modal';

interface PokeInfoModalProps{
    isOpen:boolean;
    onRequestClose:() => void;
}

export function PokeInfoModal({isOpen, onRequestClose}:PokeInfoModalProps){



    return(
        <Modal isOpen={isOpen} 
               onRequestClose={onRequestClose}
        >
            <h1>Teste</h1>
        </Modal>
    )
}