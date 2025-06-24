import React, { useEffect } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
import styles from './ConfirmModal.module.css';

const CustomConfirmModal = ({ message, onConfirm, onCancel, showModel }) => {
  // Focus the first focusable button on modal open
  useEffect(() => {
    if (showModel) {
      const focusableElements = document.querySelectorAll('[data-focusable="true"]');
      if (focusableElements.length) {
        focusableElements[0].focus();
      }
    }
  }, [showModel]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showModel) return;

      const focusableElements = Array.from(
        document.querySelectorAll('[data-focusable="true"]')
      );
      const currentIndex = focusableElements.indexOf(document.activeElement);
      const firstEl = focusableElements[0];
      const lastEl = focusableElements[focusableElements.length - 1];

      switch (e.key) {
        case 'Escape':
          onCancel(false);
          break;

        case 'Tab':
          e.preventDefault();
          if (e.shiftKey) {
            // Shift + Tab
            const prevIndex = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
            focusableElements[prevIndex].focus();
          } else {
            // Tab
            const nextIndex = (currentIndex + 1) % focusableElements.length;
            focusableElements[nextIndex].focus();
          }
          break;

        case 'ArrowRight':
          e.preventDefault();
          const nextRight = (currentIndex + 1) % focusableElements.length;
          focusableElements[nextRight].focus();
          break;

        case 'ArrowLeft':
          e.preventDefault();
          const nextLeft = (currentIndex - 1 + focusableElements.length) % focusableElements.length;
          focusableElements[nextLeft].focus();
          break;

        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showModel, onCancel]);

  if (!showModel) return null;

  return (
    <div className={styles.CMOverlay}>
      <div
        className={styles.CMModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <div className={styles.CMContent}>
          {/* <FaRegQuestionCircle color="#d32f2f" className={styles.CMIcon} /> */}
          <span
            style={{
              borderRight: `1px solid #d32f2f`,
              height: '110px',
              marginLeft: '20px',
              marginTop: '10px',
            }}
          ></span>
          <div className={styles.CMText}>
            <div className={styles.CMHead}>
              <h4 id="modalTitle">FreshVeggies says</h4>
            </div>
            <div className={styles.CMMsg}>
              <p id="modalDescription">{message}</p>
            </div>
            <div className={styles.CMButtons}>
              <button
                onClick={() => onConfirm(true)}
                className="btn btn-create h-6"
                data-focusable="true"
              >
                Ok
              </button>
              <button
                onClick={() => onCancel(false)}
                className="btn btn-delete h-6"
                data-focusable="true"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomConfirmModal;
