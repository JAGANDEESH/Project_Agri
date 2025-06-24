import { CloseButton } from 'reactstrap';
import styles from './AlertModal.module.css';
import { AlertTriangle, CheckCircle, Info, MessageSquareX } from 'lucide-react';
import { useEffect } from 'react';

const AlertModal = ({ message, isOpen, onClose, msgType }) => {
   // Focus the first focusable button on modal open
    useEffect(() => {
      if (isOpen) {
        const focusableElements = document.querySelectorAll('[data-focusable="true"]');
        if (focusableElements.length) {
          focusableElements[0].focus();
        }
      }
    }, [isOpen]);
  if (!isOpen) return null;

  const iconMap = {
    error: { icon: <AlertTriangle color="#d32f2f" className={styles.alertIcon} />, border: '#d32f2f', btn: "btn btn-delete" },
    success: { icon: <CheckCircle color="#2e7d32" className={styles.alertIcon} />, border: '#2e7d32', btn: "btn btn-create" },
    info: { icon: <Info color="#0288d1" className={styles.alertIcon} />, border: '#0288d1', btn: "btn btn-search h-7" },
    warning: { icon: <AlertTriangle color="#dba307" className={styles.alertIcon} />, border: '#dba307', btn: "btn btn-delete h-7" },
  };

  const selectedIcon = iconMap[msgType] || iconMap.info;

  return (
    <div className={styles.alertOverlay} role="dialog"
        aria-modal="true">
      <div className={styles.alertModal} style={{ '--modal-top-color': selectedIcon.border }}>
        <div className={styles.alertContent}>
          {selectedIcon.icon}
          <span style={{ borderRight: `1px solid ${selectedIcon.border}`, height: '110px', marginLeft: '20px' , marginTop:"10px"}}></span>
          <div className={styles.alertText}>
            {/* <button onClick={onClose} className='btn border-1 border-red-500 absolute ml-[20px] top-1  right-0'>  ❌ </button> */}
            <button data-focusable="true" onClick={onClose} className='btn  absolute ml-[20px] top-1  right-0'> <MessageSquareX size={21} color='green' />  </button>
            <h4>FreshVeggies says</h4>
            <p>{message}</p>
            {/* <div className={styles.alertButtons}>
              <button className={selectedIcon.btn} onClick={onClose}>OK</button>
              <button className='btn btn-cancel h-7' onClick={onClose}>CANCEL</button>
            </div> */}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AlertModal;
