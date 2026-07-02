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
      className="p-6 border border-gold bg-light rounded-lg backdrop:bg-black/50 text-amber-100 text-xl  fixed inset-0 m-auto"
    >
      <div className="flex flex-col gap-8">
        {children}
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="rounded-2xl text-gold border border-gold bg-light text-xl font-semibold p-2
            transition duration-300 ease-out  hover:brightness-110 hover:-translate-y-1 active:translate-y-0 active:scale-95"
          >
            Close
          </button>
          <button
            onClick={onAccept}
            className="rounded-2xl text-light border border-light bg-gold text-xl font-semibold p-2
            transition duration-300 ease-out  hover:brightness-110 hover:-translate-y-1 active:translate-y-0 active:scale-95"
          >
            Accept
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default CustomModal;
