import React, { useEffect, useRef } from "react";

function CustomModal({
  isOpen,
  onClose,
  onAccept,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  children: React.ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="p-6 rounded-lg border-none shadow-lg backdrop:bg-black/50 max-w-md w-full"
    >
      <div className="flex flex-col gap-4">
        {children}
        <button
          onClick={onClose}
          className="self-end px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Close
        </button>
        <button
          onClick={onAccept}
          className="self-end px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Accept
        </button>
      </div>
    </dialog>
  );
}

export default CustomModal;
